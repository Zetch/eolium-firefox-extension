
function setFilter(keyword, posts) {
  // Convert text before search
  var keywd = sanitizeText(keyword);

  // Check rows
  Array.prototype.forEach.call(posts, function(post) {
    var content = post.querySelector('.inner .postbody .content');
    // Check content exists
    if (content) {
      var text;
      try {
        text = sanitizeText(content.textContent);
      } catch(err) {
        text = "";
      }
      // Check link text doesn't contain keyword, then hide row
      if (text.search(keywd) < 0) {
        // Avoid to add the same class twice or more
        if (!post.classList.contains('noDisplay')) {
          post.classList.add('noDisplay');
        }
      // If keyword exists but row was previously hidden, show it
      } else if (post.classList.contains('noDisplay')) {
        post.classList.remove('noDisplay');
      // Keyword exists and it's not hidden
      } else {
        // OK
      }
    }
  });
}

// If it's a thread and it can be filtered/toggled
if (document.querySelector('#content-wrap #forum-wrap') &&
    document.querySelector('#forum-wrap .topic-actions')) {

  // Bind elements
  var form    = document.querySelector('#forum-wrap .topic-actions #topic-search');
  var wrapper = document.querySelector('#forum-wrap');
  var posts   = document.querySelectorAll('#forum-wrap .post');

  // Create new elements for filtering
  var inputFilter = document.createElement('input');
  inputFilter.setAttribute('type',        'text');
  inputFilter.setAttribute('id',          'inputFilter');
  inputFilter.setAttribute('placeholder', 'Filtrar mensajes...');

  var buttonCompactMode = document.createElement('button');
  buttonCompactMode.setAttribute('id',    'toggleCompact');
  buttonCompactMode.setAttribute('title', 'Modo compacto');

  var buttonImages = document.createElement('button');
  buttonImages.setAttribute('id',    'toggleImages');
  buttonImages.setAttribute('title', 'Imágenes');
  buttonImages.setAttribute('class', 'active');


  // Add input filter event, append to page
  inputFilter.addEventListener('input', function(e) {
    setFilter(e.target.value, posts);
  });
  inputFilter.addEventListener('keydown', function(e) {
    if (e.keyCode == 27) {
      e.target.value = '';
      setFilter(e.target.value, posts);
    }
  });

  form.appendChild(inputFilter);

  // Init
  self.port.on("preferencesLoaded", function(prefs) {
    var preferences = JSON.parse(prefs);

    // Set compact mode by default if it's enabled
    if (preferences['eolium_threads_compactMode']) {
      buttonCompactMode.classList.toggle('active');
      wrapper.classList.toggle('compact');
    }
    buttonCompactMode.addEventListener('click', function(e) {
      e.preventDefault();
      e.target.classList.toggle('active');
      wrapper.classList.toggle('compact');
    });

    // Hide images by default if it's enabled
    if (preferences['eolium_threads_hideImages']) {
      buttonImages.classList.toggle('active');
      wrapper.classList.toggle('hideImages');
    }
    buttonImages.addEventListener('click', function(e) {
      e.preventDefault();
      e.target.classList.toggle('active');
      wrapper.classList.toggle('hideImages');
    });

    // Append to page
    form.appendChild(buttonCompactMode);
    form.appendChild(buttonImages);

  });
}