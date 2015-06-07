
var fLink  = window.location.pathname;
var fTitle = Array.prototype.reduce.call(
  document.querySelectorAll('h2.breadcrumbs a span'), 
  function(p, n) {
    if (p.innerHTML === undefined) {
      return p + " / " + n.innerHTML;
    }
    return p.innerHTML + " / " + n.innerHTML;
  }
);


function setFilter(keyword, rows) {
  // Convert text before search
  var keywd = sanitizeText(keyword);

  // Check rows
  Array.prototype.forEach.call(rows, function(row) {
    var threadLink = row.querySelector('dl > dt > a.topictitle');
    // Check link exists
    if (threadLink) {
      var title = sanitizeText(threadLink.getAttribute('title'));
      // Check link text doesn't contain keyword, then hide row
      if (title.search(keywd) < 0) {
        // Avoid to add the same class twice or more
        if (!row.classList.contains('noDisplay')) {
          row.classList.add('noDisplay');
        }
      // If keyword exists but row was previously hidden, show it
      } else if (row.classList.contains('noDisplay')) {
        row.classList.remove('noDisplay');
      // Keyword exists and it's not hidden
      } else {
        // OK
      }
    }
  });
}


function loadIgnored(rows, manager, callback) {
  var mToggle = document.createElement("a");
  mToggle.setAttribute('href', '#');
  mToggle.setAttribute('class', 'ignore-thread');
  mToggle.innerHTML = '&times;';

  Array.prototype.forEach.call(rows, function(row) {
    // Add toggles
    var threadlink = row.querySelector('dl > dt > a.topictitle');
    var toggle = mToggle.cloneNode(true);

    // Add event, toggle thread as ignored
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      // Parse info
      var tLink  = e.target.previousElementSibling.getAttribute('href');
      var tTitle = e.target.previousElementSibling.getAttribute('title');

      manager.toggle(fTitle, fLink, tTitle, tLink);
      manager.save(function() {
        e.target.classList.toggle('ignored');
        console.info('Thread added');

        // Toggle visibility if filter is active
        if (!document.getElementById('buttonIgnored').classList.contains('active') &&
            e.target.classList.contains('ignored')) {
          e.target.parentElement.parentElement.parentElement.classList.toggle('hideIgnored');
        }
      });
    });

    // Check if it's ignored
    if (manager.isThreadIgnored(fLink, threadlink.getAttribute('href'))) {
      toggle.classList.add('ignored');
    }

    threadlink.parentElement.insertBefore(toggle, threadlink.nextElementSibling);
  });

  // Run callback
  callback();
}


function toggleVisibility(toggle, hidden, rows) {
  // Check given toggle name
  var selector, className;
  if (toggle === 'read') {
    selector  = 'a:not(.rowunre)';
    className = 'hideRead';
  } else if (toggle === 'closed') {
    selector = 'a.rowlock';
    className = 'hideClosed';
  } else if (toggle === 'archived') {
    selector = 'a.rowarch';
    className = 'hideArchived';
  } else if (toggle === 'ignored') {
    selector = 'dt a.ignored';
    className = 'hideIgnored';
  } else {
    // Do nothing
    return;
  }
  // Toggle class on desired rows
  Array.prototype.forEach.call(rows, function(row) {
    if (row.querySelector('dl > ' + selector)) {
      row.classList.toggle(className);
    }
  });
}


// If it's a forum and it can be filtered (exclude forums without topics)
if (document.querySelector('#content-wrap #forum-wrap') &&
    document.querySelector('#forum-wrap .topic-actions')) {

  // Bind elements
  var form = document.querySelector('#forum-wrap .topic-actions #forum-search');
  var rows = document.querySelectorAll('#forum-wrap .forumbg:not(.announcement) .topics .row');

  // Fix display buttons when full width is disabled
  var markAsRead = document.querySelector('#forum-wrap .topic-actions .pagination a[accesskey="m"]')
  if (markAsRead) {
    markAsRead.textContent = 'Marcar como leídos';
  }

  // Create new elements for filtering
  var inputFilter = document.createElement('input');
  inputFilter.setAttribute('type',        'text');
  inputFilter.setAttribute('id',          'inputFilter');
  inputFilter.setAttribute('placeholder', 'Filtrar hilos...');

  var buttonRead = document.createElement('button');
  buttonRead.setAttribute('id',    'buttonRead');
  buttonRead.setAttribute('title', 'Leídos');
  buttonRead.setAttribute('class', 'active');

  var buttonClosed = document.createElement('button');
  buttonClosed.setAttribute('id',    'buttonClosed');
  buttonClosed.setAttribute('title', 'Cerrados');
  buttonClosed.setAttribute('class', 'active');

  var buttonArchived = document.createElement('button');
  buttonArchived.setAttribute('id',    'buttonArchived');
  buttonArchived.setAttribute('title', 'Archivados');
  buttonArchived.setAttribute('class', 'active');

  var buttonIgnored = document.createElement('button');
  buttonIgnored.setAttribute('id',    'buttonIgnored');
  buttonIgnored.setAttribute('title', 'Ignorados');
  buttonIgnored.setAttribute('class', 'active');


  // Add input filter event, append to page
  inputFilter.addEventListener('input', function(e) {
    setFilter(e.target.value, rows);
  });

  form.appendChild(inputFilter);

  // Init
  self.port.on("preferencesLoaded", function(prefs) {
    var preferences = JSON.parse(prefs);

    if (preferences['eolium_forums_hideRead']) {
      toggleVisibility('read', buttonRead.classList.toggle('active'), rows);
    }
    buttonRead.addEventListener('click', function(e) {
      e.preventDefault();
      toggleVisibility('read', e.target.classList.toggle('active'), rows);
    });

    if (preferences['eolium_forums_hideClosed']) {
      toggleVisibility('closed', buttonClosed.classList.toggle('active'), rows);
    }
    buttonClosed.addEventListener('click', function(e) {
      e.preventDefault();
      toggleVisibility('closed', e.target.classList.toggle('active'), rows);
    });

    if (preferences['eolium_forums_hideArchived']) {
      toggleVisibility('archived', buttonArchived.classList.toggle('active'), rows);
    }
    buttonArchived.addEventListener('click', function(e) {
      e.preventDefault();
      toggleVisibility('archived', e.target.classList.toggle('active'), rows);
    });

    // Load ignored threads
    var manager = new IgnoredManager(preferences['eolium_forums_ignoredThreads']);

    loadIgnored(rows, manager, function() {
      console.log(preferences);
      if (preferences['eolium_forums_hideIgnored']) {
        toggleVisibility('ignored', buttonIgnored.classList.toggle('active'), rows);
      }
      buttonIgnored.addEventListener('click', function(e) {
        e.preventDefault();
        toggleVisibility('ignored', e.target.classList.toggle('active'), rows);
      });
    });

    // Append to page
    form.appendChild(buttonRead);
    form.appendChild(buttonClosed);
    form.appendChild(buttonArchived);
    form.appendChild(buttonIgnored);
  });
}