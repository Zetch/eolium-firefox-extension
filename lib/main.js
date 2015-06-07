
// Configuration
var preferences = require("sdk/preferences/service");
// Enable debug logging
preferences.set("extensions.sdk.console.logLevel", 'debug');

var pageMod = require("sdk/page-mod"),
    self    = require("sdk/self"),
    tabs    = require("sdk/tabs"),
    ui      = require("sdk/ui"),
    prefs   = require("./preferences");


// Preferences page
var actionButton = ui.ActionButton({
  id: "eolium-button",
  label: "EOLium",
  icon: {
    '16': self.data.url("images/icon16.png"),
    '32': self.data.url("images/icon32.png"),
    '64': self.data.url("images/icon64.png")
  },

  onClick: function(state) {
    tabs.open({
      url: self.data.url("options.html"),

      // Preferences worker
      onLoad: function(tab) {
        var worker = tab.attach({
          contentScriptFile: [
            self.data.url("js/ignored.js"),
            self.data.url("js/options.js")
          ]
        });
        var prefService = new prefs.PreferenceService(worker);
      }
    });
  }
});


// Content Scripts

// Global
pageMod.PageMod({
  include: "http://www.elotrolado.net/*",
  contentScriptFile: [
    self.data.url("js/global.js"),
    self.data.url("js/userzone.js"),
    self.data.url("js/header.js"),
    self.data.url("js/navigation.js")
  ],
  contentStyleFile:  [
    self.data.url("styles/navigation.css"),
    self.data.url("styles/header.css"),
    self.data.url("styles/userzone.css")
  ],
  contentScriptWhen: "ready",
  onAttach: prefs.PreferenceService
});

// News
pageMod.PageMod({
  include: [
    "http://www.elotrolado.net/",
    "http://www.elotrolado.net/noticias*"
  ],
  contentScriptFile: self.data.url("js/news.js"),
  contentStyleFile: self.data.url("styles/news.css"),
  contentScriptWhen: "ready",
  onAttach: prefs.PreferenceService
});

// Forums
pageMod.PageMod({
  include: "http://www.elotrolado.net/foro_*",
  contentScriptFile: [
    self.data.url("js/common.js"),
    self.data.url("js/ignored.js"),
    self.data.url("js/forums.js")
  ],
  contentStyleFile: self.data.url("styles/forums.css"),
  contentScriptWhen: "ready",
  onAttach: prefs.PreferenceService
});

// Threads
pageMod.PageMod({
  include: "http://www.elotrolado.net/hilo_*",
  contentScriptFile: [
    self.data.url("js/common.js"),
    self.data.url("js/threads.js")
  ],
  contentStyleFile: self.data.url("styles/threads.css"),
  contentScriptWhen: "ready",
  onAttach: prefs.PreferenceService
});
