
function IgnoredManager(tree) {
  this._tree = tree || {};
  this._regexId = /\d+$/;
}

  // Parse ID from link
  IgnoredManager.prototype.getId = function(link) {
    try {
      return parseInt(this._regexId.exec(link));
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  IgnoredManager.prototype.toggle = function(fTitle, fLink, tTitle, tLink) {
    if (this.isThreadIgnored(fLink, tLink)) {
      this._removeThread(fLink, tLink);
      return false;
    } else {
      this._addThread(fTitle, fLink, tTitle, tLink);
      return true;
    }
  }

  IgnoredManager.prototype.isThreadIgnored = function(fLink, tLink) {
    var fId = this.getId(fLink);
    if (!this._tree.hasOwnProperty(fId)) return false;
    var tId = this.getId(tLink);
    if (!this._tree[fId].threads.hasOwnProperty(tId)) return false;
    // Found it
    return true;
  };

  // Add new thread to ignored
  IgnoredManager.prototype._addThread = function(fTitle, fLink, tTitle, tLink) {
    // Check if forum exists
    var fId = this.getId(fLink);
    var tId = this.getId(tLink);
    try {
      if (!this._tree.hasOwnProperty(fId)) {
        this._tree[fId] = { title: fTitle, link: fLink, threads: {} };
      }
      this._tree[fId].threads[tId] = { title: tTitle, link: tLink };
    } catch (err) {
      console.error(err);
    }
  };

  // Remove thread from ignored
  IgnoredManager.prototype._removeThread = function(fLink, tLink) {
    var fId = this.getId(fLink);
    var tId = this.getId(tLink);
    try {
      delete this._tree[fId].threads[tId];
    } catch (err) {
      console.error(err);
    }
  };

  // Remove forum with all its threads
  IgnoredManager.prototype.removeForum = function(fLink) {
    var fId = this.getId(fLink);
    if (this._tree.hasOwnProperty(fId)) {
      delete this._tree[fId];
    }
  };

  // Return HTML nodes tree
  IgnoredManager.prototype.buildHtml = function() {
    var tree = document.createElement('ul');
    var that = this;

    // Forums loop
    Array.prototype.forEach.call(Object.keys(this._tree), function(fId) {
      var tItem = document.createElement('li');
      var forum = document.createElement('a');
      forum.setAttribute('href', 'http://www.elotrolado.net' + that._tree[fId].link);
      forum.setAttribute('class', 'forum');
      forum.innerHTML = that._tree[fId].title;
      tItem.appendChild(forum);
      
      var subtree = document.createElement('ul');

      // Threads loop
      Array.prototype.forEach.call(Object.keys(that._tree[fId].threads), function(tId) {
        var sItem = document.createElement('li');
        var thread = document.createElement('a');
        thread.setAttribute('href', 'http://www.elotrolado.net/' + that._tree[fId].threads[tId].link);
        thread.innerHTML = that._tree[fId].threads[tId].title;
        sItem.appendChild(thread);
        subtree.appendChild(sItem);
      });

      tItem.appendChild(subtree);
      tree.appendChild(tItem);
    });

    return tree;
  };

  IgnoredManager.prototype.save = function(callback) {
    self.port.emit('preferencesUpdated', JSON.stringify({ 'eolium_forums_ignoredThreads': this._tree }));
    callback();
  };
