function toggleThreadsContainer(e) {
  e.preventDefault();
  var threads = document.getElementById('eolium_forums_ignoredThreads');
  threads.classList.toggle('hide');
  e.target.classList.toggle('open');
}


function savePreferences() {
  var toSave = {};

  // Load values from form
  var inputs = document.querySelectorAll(".option input");
  Array.prototype.forEach.call(inputs, function(input) {
    var name = input.getAttribute('id');
    if (name == 'eolium_forums_ignoredThreads') return;
    var value;
    if (input.type === "checkbox") {
      value = input.checked;
    } else {
      value = input.value;
    }
    toSave[name] = value;
  });

  // Send them to PreferenceService
  self.port.emit('preferencesUpdated', JSON.stringify(toSave));

  var status = document.getElementById('status');
  status.textContent = 'Saved';
  status.classList.toggle('show');
  setTimeout(function() {
    status.classList.toggle('show');
  }, 2000);
}


function loadPreferences(prefs) {
  var preferences = JSON.parse(prefs);

  for (name in preferences) {
    var input = document.getElementById(name);
    if (input) {
      if (name !== 'eolium_forums_ignoredThreads') {
        if (input.type === "checkbox") {
          input.checked = preferences[name];
        } else {
          input.value = preferences[name];
        }
      } else {
        var manager = new IgnoredManager(preferences[name]);
        var tree = manager.buildHtml();
        input.appendChild(tree);
      }
    }
  };
}

var toggleIgnored = document.getElementById('toggleIgnored');
toggleIgnored.addEventListener('click', toggleThreadsContainer);

// Load preferences on load
self.port.on("preferencesLoaded", loadPreferences);
// Save preferences on 'Save' link
document.getElementById('savePreferences').addEventListener('click', savePreferences);
