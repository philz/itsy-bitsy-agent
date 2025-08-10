# AgenticLoop Message Queuing Feature

This document describes the new message queuing functionality added to AgenticLoop, which allows user messages to be processed immediately without waiting for the current agent loop to finish.

## Problem Solved

Previously, when a user sent a message while the agent was processing (making API calls, executing tools), that new message would be lost or would have to wait for the entire current conversation loop to complete. This created a poor user experience, especially during long-running operations.

## Solution

The new message queuing system:

1. **Queues incoming messages** instead of blocking or losing them
2. **Interrupts current processing** when new messages arrive
3. **Processes messages in order** while maintaining conversation context
4. **Handles errors gracefully** without stopping the entire queue
5. **Maintains backward compatibility** with existing code

## New Methods

### `queueMessage(message: string): void`

Queues a user message for processing. If the agent is currently idle, processing starts immediately. If the agent is busy, the current operation is interrupted and the new message is processed next.

```typescript
agenticLoop.queueMessage('Hello, can you help me?');
```

### `stop(): void`

Stops the current processing loop. Any messages remaining in the queue will not be processed.

```typescript
agenticLoop.stop();
```

### `getIsRunning(): boolean`

Returns whether the agent is currently processing messages.

```typescript
if (agenticLoop.getIsRunning()) {
  console.log('Agent is busy processing');
}
```

### `getQueueLength(): number`

Returns the number of messages waiting in the queue.

```typescript
console.log(`${agenticLoop.getQueueLength()} messages queued`);
```

### `sendMessage(message: string): Promise<void>`

**Deprecated**: Use `queueMessage()` instead. This method still works for backward compatibility but doesn't provide the queuing benefits.

## How It Works

### Message Queue Processing

1. Messages are stored in an internal queue (`messageQueue: string[]`)
2. A single processing loop runs when messages are available
3. Messages are processed one at a time in FIFO order
4. Each message goes through the full agent loop (API calls, tool execution)

### Interruption Mechanism

1. When a new message is queued during processing, `shouldStop` flag is set
2. The current agent loop checks this flag after each API call and tool execution
3. If interrupted, the current message processing completes, then the queue continues
4. This ensures conversation context is maintained properly

### Error Handling

- API errors are caught and logged but don't stop queue processing
- Each message is processed independently
- Queue continues even if individual messages fail

## Usage Examples

### Basic Usage

```typescript
const agenticLoop = new AgenticLoop({
  apiKey: 'your-api-key',
  systemPrompt: 'You are a helpful assistant',
  tools: [],
  onMessage: (role, content) => {
    console.log(`${role}: ${content}`);
  }
});

// Queue messages - they'll be processed in order
agenticLoop.queueMessage('What is the weather?');
agenticLoop.queueMessage('What about tomorrow?');
agenticLoop.queueMessage('Thanks!');
```

### Interruption Example

```typescript
// Start a potentially long operation
agenticLoop.queueMessage('Please analyze this complex document...');

// User sends urgent message while first is processing
setTimeout(() => {
  agenticLoop.queueMessage('Actually, I need help with something else urgent!');
}, 1000);

// The urgent message will interrupt and be processed next
```

### Status Monitoring

```typescript
function monitorQueue() {
  console.log({
    isRunning: agenticLoop.getIsRunning(),
    queueLength: agenticLoop.getQueueLength()
  });
}

// Check status periodically
setInterval(monitorQueue, 1000);
```

## Migration Guide

### For Existing Code

Existing code using `runLoop()` or `sendMessage()` continues to work:

```typescript
// Old way (still works)
await agenticLoop.runLoop('Hello');

// Old way with wrapper (still works)
await agenticLoop.sendMessage('Hello');

// New way (recommended)
agenticLoop.queueMessage('Hello');
```

### For Better UX

Replace direct `runLoop()` calls with `queueMessage()` for better message handling:

```typescript
// Before
button.addEventListener('click', async () => {
  await agenticLoop.runLoop(input.value);
});

// After
button.addEventListener('click', () => {
  agenticLoop.queueMessage(input.value);
});
```

## Configuration

No additional configuration is required. The queuing system works with all existing AgenticLoop options:

```typescript
const agenticLoop = new AgenticLoop({
  apiKey: 'your-api-key',
  selectedModel: 'claude-3-5-sonnet-20241022',
  systemPrompt: 'System prompt',
  tools: yourTools,
  onMessage: (role, content) => { /* handle messages */ },
  onTokenUsage: (usage) => { /* handle token usage */ },
  onPreToolCall: (toolCall) => { /* handle pre-tool call */ },
  onToolCall: (toolCall, result) => { /* handle tool calls */ }
});
```

## Implementation Notes

### Thread Safety

- Only one processing loop runs at a time (`isRunning` flag)
- Message queue operations are synchronous and atomic
- No race conditions in message ordering

### Memory Usage

- Messages are removed from queue after processing
- No memory leaks from accumulated messages
- Conversation history managed by existing AgenticLoop logic

### Performance

- Minimal overhead added to existing processing
- Interruption checking adds microseconds per API call/tool execution
- No performance impact when not using queuing features

## Testing

Comprehensive tests are included in `tests/agenticloop.test.js` and `tests/agenticloop-integration.test.js`:

```bash
npm test
```

Test coverage includes:
- Basic message queuing
- Message ordering
- Interruption behavior
- Tool call handling with queuing
- Error handling
- Backward compatibility
- Rapid message queuing
- Edge cases

## Demo

See `demo-queue.html` for an interactive demonstration of the message queuing functionality.

## Benefits

1. **Better User Experience**: Users don't lose messages or have to wait
2. **Responsive Interface**: UI remains responsive during processing
3. **Natural Conversation Flow**: Messages processed in order maintain context
4. **Error Resilience**: Individual message failures don't break the queue
5. **Backward Compatibility**: Existing code continues to work unchanged
6. **Easy Migration**: Simple method name change for better behavior
