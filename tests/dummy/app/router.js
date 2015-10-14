import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('scrolling-exp');
  this.route('query-params-exp');

  this.route('items');
  this.route('item', { path: '/items/:item_id' });
});

export default Router;
