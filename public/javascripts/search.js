(function (window) {
  window.performKeywordSearch = function (string) {
    string = string.trim();
    if (string.length > 0) {
      window.location.href = APP_CONFIG.base_url + 'search/' + encodeURIComponent(string);
    }
  };
})(window);
