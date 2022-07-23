(function (window) {
  window['env'] = window['env'] || {};

  // Environment variables
  window['env']['apiUrl'] = '${APIURL}';
  window['env']['frontUrl'] = '${FRONTURL}';
})(this);
