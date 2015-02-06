
// Use simple-storage API to store addon settings
var ss = require("sdk/simple-storage");


function Preferences() {
  /*
    This class tries to emulate a preferences system
    for extension using simple-storage API due to Firefox SDK 
    simple prefs aren't accessible from content scripts.

    It stores only boolean values
  */
  this.storage = ss.storage;

  this.defaults = {
    // Header
    'eolium_header_compactMode':       false,

    // News
    'eolium_news_singleRow':           false,

    // User Panel
    'eolium_userZone_compactMode':     true,

    // Forums
    'eolium_forums_hideRead':          false,
    'eolium_forums_hideClosed':        false,
    'eolium_forums_hideArchived':      false,

    // Threads
    'eolium_threads_compactMode':      false,
    'eolium_threads_hideImages':       false,

    // Other
    'eolium_other_hideForumTitle':     false,
    'eolium_other_hideRelatedWikis':   false,
    'eolium_other_hideGlobalAnnouces': false,
    'eolium_other_hideRules':          false
  }
}

Preferences.prototype.keys = function() {
  return Object.keys(this.defaults);
}

Preferences.prototype.get = function(name) {
  var value = this.storage[name];
  // If not exists, returns default value
  if (value === null || value === undefined) {
    return this.defaults[name];
  } else {
    return value;
  }
};

Preferences.prototype.set = function(name, value) {
  this.storage[name] = value;
};

Preferences.prototype.getJSON = function() {
  var keys = this.keys();
  var toConvert = {};
  for (idx in keys) {
    toConvert[ keys[idx] ] = this.get( keys[idx] );
  }
  return JSON.stringify(toConvert);
};

Preferences.prototype.setJSON = function(json) {
  try {
    var prefs = JSON.parse(json);
    for (name in prefs) {
      this.set(name, prefs[name]);
    }
  } catch (err) {
    console.log(err);
  }
};


function PreferenceService(worker) {
  /*
    Communicate between content script and extensions
    through worker to send and receive preference
    settings as JSON strings
  */
  
  var preferences = new Preferences();
  // Send settings loaded
  worker.port.emit('preferencesLoaded', preferences.getJSON());

  // When receive settings, save them
  worker.port.on('preferencesUpdated', function(json) {
    preferences.setJSON(json);
  });
}


exports.Preferences = Preferences;
exports.PreferenceService = PreferenceService;
