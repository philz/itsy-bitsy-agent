import { test, describe, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert';
import { AgenticLoop } from '../dist/agenticloop.js';

// Mock fetch for browser environment
const originalFetch = globalThis.fetch;

describe('AgenticLoop Integration Tests', () => {
  let mockFetch;

  beforeEach(() => {
    // Create mock fetch that simulates Anthropic API
    mockFetch = mock.fn(async (url, options) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const body = JSON.parse(options.body);
      const lastMessage = body.messages[body.messages.length - 1];
      
      // Simple response - just return text
      return {
        ok: true,
        status: 200,
        json: async () => ({
          content: [{
            type: 'text',
            text: `Response to: ${typeof lastMessage.content === 'string' ? lastMessage.content.substring(0, 50) : 'message'}...`
          }],
          usage: {
            input_tokens: 100,
            output_tokens: 50,
            cache_creation_input_tokens: 0,
            cache_read_input_tokens: 0
          }
        })
      };
    });
    
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    mock.reset();
  });

  test('real AgenticLoop should handle message queuing', async () => {
    const messageLog = [];
    const agenticLoop = new AgenticLoop({
      apiKey: 'test-key',
      selectedModel: 'claude-3-5-haiku-20241022',
      systemPrompt: 'Test system prompt',
      tools: [],
      onMessage: (role, content) => {
        messageLog.push({ role, content, timestamp: Date.now() });
      }
    });

    // Queue multiple messages
    agenticLoop.queueMessage('First message');
    agenticLoop.queueMessage('Second message');
    agenticLoop.queueMessage('Third message');
    
    // Wait for processing
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Should have processed all messages
    assert.strictEqual(messageLog.length, 3);
    assert.strictEqual(agenticLoop.getQueueLength(), 0);
    assert.strictEqual(agenticLoop.getIsRunning(), false);
    
    // Should have made API calls
    assert.strictEqual(mockFetch.mock.callCount(), 3);
  });

  test('real AgenticLoop should handle interruption by new messages', async () => {
    // Create a slower mock to simulate longer processing
    mockFetch = mock.fn(async (url, options) => {
      await new Promise(resolve => setTimeout(resolve, 50));
      return {
        ok: true,
        json: async () => ({
          content: [{ type: 'text', text: 'Slow response' }],
          usage: { input_tokens: 100, output_tokens: 50 }
        })
      };
    });
    globalThis.fetch = mockFetch;

    const messageLog = [];
    const agenticLoop = new AgenticLoop({
      apiKey: 'test-key',
      selectedModel: 'claude-3-5-haiku-20241022',
      systemPrompt: 'Test system prompt',
      tools: [],
      onMessage: (role, content) => {
        messageLog.push({ role, content, timestamp: Date.now() });
      }
    });

    // Start first message
    agenticLoop.queueMessage('Slow message 1');
    
    // Wait a bit, then queue another message
    await new Promise(resolve => setTimeout(resolve, 20));
    assert.strictEqual(agenticLoop.getIsRunning(), true);
    
    agenticLoop.queueMessage('Urgent message 2');
    
    // Wait for all processing to complete
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Should have processed both messages
    assert.strictEqual(messageLog.length, 2);
    assert.strictEqual(agenticLoop.getQueueLength(), 0);
    assert.strictEqual(agenticLoop.getIsRunning(), false);
  });

  test('real AgenticLoop should handle tool calls with queuing', async () => {
    let callCount = 0;
    mockFetch = mock.fn(async (url, options) => {
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const body = JSON.parse(options.body);
      const lastMessage = body.messages[body.messages.length - 1];
      
      callCount++;
      
      // Check if this is a tool result message
      if (Array.isArray(lastMessage.content) && 
          lastMessage.content.some(c => c.type === 'tool_result')) {
        // Respond to tool result with final answer
        return {
          ok: true,
          json: async () => ({
            content: [{ type: 'text', text: 'Tool execution completed successfully' }],
            usage: { input_tokens: 50, output_tokens: 25 }
          })
        };
      } else {
        // Respond with tool call
        return {
          ok: true,
          json: async () => ({
            content: [
              { type: 'text', text: 'I will use a tool' },
              {
                type: 'tool_use',
                id: 'tool_123',
                name: 'test_tool',
                input: { action: 'test' }
              }
            ],
            usage: { input_tokens: 100, output_tokens: 50 }
          })
        };
      }
    });
    globalThis.fetch = mockFetch;

    const testTool = {
      name: 'test_tool',
      description: 'A test tool',
      input_schema: {
        type: 'object',
        properties: { action: { type: 'string' } },
        required: ['action']
      },
      handler: async (input) => `Tool executed: ${input.action}`
    };

    const messageLog = [];
    const toolCallLog = [];
    
    const agenticLoop = new AgenticLoop({
      apiKey: 'test-key',
      selectedModel: 'claude-3-5-haiku-20241022',
      systemPrompt: 'Test system prompt',
      tools: [testTool],
      onMessage: (role, content) => {
        messageLog.push({ role, content });
      },
      onToolCall: (toolCall, result) => {
        toolCallLog.push({ toolCall, result });
      }
    });

    agenticLoop.queueMessage('Please use a tool');
    
    // Wait for tool processing to complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Should have made 2 API calls (tool call + response after tool)
    assert.strictEqual(mockFetch.mock.callCount(), 2);
    
    // Should have executed the tool
    assert.strictEqual(toolCallLog.length, 1);
    assert.strictEqual(toolCallLog[0].toolCall.name, 'test_tool');
    assert.strictEqual(toolCallLog[0].result.content, 'Tool executed: test');
    
    // Should have received messages
    assert.ok(messageLog.length >= 2);
  });
  
  test('real AgenticLoop should maintain backward compatibility', async () => {
    const messageLog = [];
    const agenticLoop = new AgenticLoop({
      apiKey: 'test-key',
      selectedModel: 'claude-3-5-haiku-20241022', 
      systemPrompt: 'Test system prompt',
      tools: [],
      onMessage: (role, content) => {
        messageLog.push({ role, content });
      }
    });

    // Use the original sendMessage method
    await agenticLoop.sendMessage('Test backward compatibility');
    
    assert.strictEqual(messageLog.length, 1);
    assert.strictEqual(messageLog[0].role, 'assistant');
    assert.strictEqual(mockFetch.mock.callCount(), 1);
  });

  test('real AgenticLoop should handle API errors gracefully', async () => {
    mockFetch = mock.fn(async () => {
      return {
        ok: false,
        status: 401
      };
    });
    globalThis.fetch = mockFetch;

    const agenticLoop = new AgenticLoop({
      apiKey: 'invalid-key',
      selectedModel: 'claude-3-5-haiku-20241022',
      systemPrompt: 'Test system prompt', 
      tools: []
    });

    // This should handle the error gracefully
    agenticLoop.queueMessage('Test message');
    
    // Wait for processing attempt
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Should have attempted the API call
    assert.strictEqual(mockFetch.mock.callCount(), 1);
    
    // Should not be running after error
    assert.strictEqual(agenticLoop.getIsRunning(), false);
  });
});
