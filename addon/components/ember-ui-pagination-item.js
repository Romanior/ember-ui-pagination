import Ember from 'ember';

/**
 *  An actual item pagination iterate over
 *  You can overwrite it in order to provide different layout
 *  and more user-specific actions
 *
 */

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['ember-ui-pagination__item']
});
