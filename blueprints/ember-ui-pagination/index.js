'use strict';
var path = require('path');

module.exports = {
  description: '',
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var path = this.addBowerPackageToProject('jquery.inview');
    return path.addBowerPackageToProject('comma-separated-values');
  }
};
