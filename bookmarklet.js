javascript:(function(){
  if (window.bookmarkletAgent) {
    window.bookmarkletAgent.toggle();
    return;
  }
  
  const script = document.createElement('script');
  script.src = 'https://philz-bookmarklet.fly.dev/agent.js?t=' + Date.now();
  script.onload = function() {
    if (window.bookmarkletAgent) {
      window.bookmarkletAgent.init();
    }
  };
  script.onerror = function() {
    alert('Itsy Bitsy failed to load. This website may have Content Security Policy (CSP) restrictions that block external scripts. Try using the bookmarklet on a different website.');
  };
  
  try {
    document.head.appendChild(script);
  } catch (e) {
    alert('Itsy Bitsy failed to load. This website may have Content Security Policy (CSP) restrictions. Error: ' + e.message);
  }
})();