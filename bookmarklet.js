javascript:(function(){
  if (window.bookmarkletAgent) {
    try {
      window.bookmarkletAgent.toggle();
    } catch (e) {
      console.error('Bookmarklet toggle error:', e);
      alert('Bookmarklet error: ' + e.message);
    }
    return;
  }
  
  // Create loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'itsy-loading';
  loadingDiv.style.cssText = `
    position: fixed !important;
    top: 1.25rem !important;
    right: 1.25rem !important;
    width: 3rem !important;
    height: 3rem !important;
    background-color: #2563eb !important;
    border: 2px solid white !important;
    border-radius: 50% !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: white !important;
    font-size: 1.25rem !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
    z-index: 2147483647 !important;
    animation: spin 1s linear infinite !important;
  `;
  loadingDiv.innerHTML = '⏳';
  
  // Add spin animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(loadingDiv);
  
  function removeLoading() {
    const loading = document.getElementById('itsy-loading');
    if (loading) loading.remove();
  }
  
  const script = document.createElement('script');
  script.src = 'https://philz-bookmarklet.fly.dev/agent.js?t=' + Date.now();
  
  script.onload = function() {
    removeLoading();
    console.log('Agent script loaded successfully');
    if (window.bookmarkletAgent) {
      console.log('bookmarkletAgent found, initializing...');
      try {
        window.bookmarkletAgent.init();
        console.log('bookmarkletAgent initialized successfully');
      } catch (e) {
        console.error('Bookmarklet init error:', e);
        alert('Bookmarklet initialization error: ' + e.message);
      }
    } else {
      console.error('bookmarkletAgent not found after script load');
      alert('Bookmarklet failed: Agent not found after loading script');
    }
  };
  
  script.onerror = function(e) {
    removeLoading();
    console.error('Script loading error:', e);
    alert('Itsy Bitsy failed to load. This website may have Content Security Policy (CSP) restrictions that block external scripts. Try using the bookmarklet on a different website.');
  };
  
  try {
    document.head.appendChild(script);
    console.log('Script element added to head');
  } catch (e) {
    removeLoading();
    console.error('Script append error:', e);
    alert('Itsy Bitsy failed to load. This website may have Content Security Policy (CSP) restrictions. Error: ' + e.message);
  }
})()