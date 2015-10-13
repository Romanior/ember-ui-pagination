import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('examples');
  this.route('example', { path: '/examples/:example_id' });
  this.route('items');
  this.route('item', { path: '/items/:item_id' });
});

export default Router;
