
function compareNewsDate(new1, new2) {
  var date1 = new1.querySelector('time');
  var date2 = new2.querySelector('time');
  if (date1 && date2) {
    try {
      var stamp1 = Date.parse(date1.getAttribute('datetime'));
      var stamp2 = Date.parse(date2.getAttribute('datetime'));
      return stamp2 - stamp1;
    } catch (err) {}
  }
  return 0;
}

 // Init
self.port.on("preferencesLoaded", function(prefs) {
  var preferences = JSON.parse(prefs);

  if (preferences['eolium_news_singleRow']) {
    // Bind elements
    var newsContainer = document.getElementById('news');
    var news = newsContainer.querySelectorAll('.new');
    var newsLeft = newsContainer.querySelector('#news-left');
    var newsRight = newsContainer.querySelector('#news-right');
    var newsPagination = newsContainer.querySelector('#news-pagination');

    // Delete columns
    newsLeft.remove()
    newsRight.remove()

    // Add news to container by date desc order
    news = Array.prototype.slice.call(news, 0);
    news.sort(compareNewsDate);
    news.forEach(function(newItem) {
      newsContainer.insertBefore(newItem, newsPagination);
    });

    newsContainer.classList.toggle('single-row');
  }

});