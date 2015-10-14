'use strict';

module.exports = {
  description: '',
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    this.addBowerPackageToProject('jquery.inview');
    this.addBowerPackageToProject('comma-separated-values');
  }
};
