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
  
  const script = document.createElement('script');
  script.src = 'https://philz-bookmarklet.fly.dev/agent.js?t=' + Date.now();
  
  script.onload = function() {
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
    console.error('Script loading error:', e);
    alert('Itsy Bitsy failed to load. This website may have Content Security Policy (CSP) restrictions that block external scripts. Try using the bookmarklet on a different website.');
  };
  
  try {
    document.head.appendChild(script);
    console.log('Script element added to head');
  } catch (e) {
    console.error('Script append error:', e);
    alert('Itsy Bitsy failed to load. This website may have Content Security Policy (CSP) restrictions. Error: ' + e.message);
  }
})();