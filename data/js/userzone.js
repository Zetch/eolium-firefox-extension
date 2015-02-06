
// Init
self.port.on("preferencesLoaded", function(prefs) {
  var preferences = JSON.parse(prefs);

  var userZone  = document.querySelector('#h-ucp');
  var userPopup = document.querySelector('#h-popup.h-popup-user');

  // If user is logged then exists, and if compactMode is enabled
  if (userPopup && preferences['eolium_userZone_compactMode']) {
    // Add compact class
    userZone.classList.add('compact');
    userPopup.classList.add('compact');

    // Replace <br> with whitespaces
    userPopup.innerHTML = userPopup.innerHTML.replace(/<br>/g, ' ');

    // Delete user zone options separator
    var options = userPopup.querySelector('#h-p-options');
    if (options) {
      Array.prototype.forEach.call(options.childNodes, function(node) {
        if (node.nodeType === 3) { // It's just text node
          node.remove();
        }
      });
    }

    // Put close session link inside of popup
    var logout = userZone.querySelector('#u-meta');
    var popupContent = userPopup.querySelector('#h-p-content');
    logout.remove();
    userPopup.insertBefore(logout, userPopup.firstChild);
  }

});