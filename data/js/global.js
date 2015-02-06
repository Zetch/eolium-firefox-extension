
// Init
self.port.on("preferencesLoaded", function(prefs) {
  var preferences = JSON.parse(prefs);

  // Hide main title in forums
  if (window.location.pathname.match(/^\/foro_/) &&
      preferences['eolium_other_hideForumTitle']) {
        
    var title = document.querySelector('#forum-wrap > h1');
    if (title) {
      title.remove();
    }
    try {
      document.querySelector('#forum-wrap > h2.breadcrumbs').style.float = 'left';
      document.querySelector('#forum-wrap > ul.linklist').style.float = 'right';
      document.querySelector('#forum-wrap > .clear').remove();
    } catch (err) {

    }
  }

  // Hide related wikis
  if (preferences['eolium_other_hideRelatedWikis']) {
    var wikis = document.querySelector('#forum-wrap > .forabg.wikis');
    if (wikis) {
      wikis.remove();
    }
  }

  // Hide global announces
  if (preferences['eolium_other_hideGlobalAnnouces']) {
    var announces = document.querySelector('#forum-wrap > .forumbg.announcement');
    if (announces) {
      announces.remove();
    }
  }

  // Hide Rules banner
  if (preferences['eolium_other_hideRules']) {
    var rules = document.querySelector('#forum-wrap > .rules');
    if (rules) {
      rules.remove();
    }
  }

});