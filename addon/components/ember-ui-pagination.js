import Ember from 'ember';
import layout from '../templates/components/ember-ui-pagination';

/**
 *
 *
 *
 *
  */


export default Ember.Component.extend({
  layout: layout,
  limit: 10,
  offset:  Ember.computed('', function(){



  })


// supply model type, create models for slice,
// figure out if it's API or DATA,
// use continuous scrolling ? yes for now
// loading indicator?

});
