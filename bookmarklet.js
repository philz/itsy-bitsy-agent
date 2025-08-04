javascript:(function(){
  if (window.bookmarkletAgent) {
    window.bookmarkletAgent.toggle();
    return;
  }
  
  const script = document.createElement('script');
  script.src = 'https://philz-bookmarklet.fly.dev/agent.js';
  script.onload = function() {
    if (window.bookmarkletAgent) {
      window.bookmarkletAgent.init();
    }
  };
  document.head.appendChild(script);
})();