'use strict';

module.exports = {
  description: '',
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
  },

  afterInstall: function() {
    return this.addBowerPackageToProject('comma-separated-values')
  }
};
