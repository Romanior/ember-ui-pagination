/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-ui-pagination',
  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },
  included: function(app) {
    this._super.included(app);
    this.app.import(app.bowerDirectory + '/comma-separated-values/csv.js');
  }
};
