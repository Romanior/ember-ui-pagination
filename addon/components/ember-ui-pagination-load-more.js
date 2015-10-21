import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

// TODO loading in opposite direction e.g. decrement page count

export default Ember.Component.extend(InViewportMixin, {
  tagName: 'li',
  classNames: ['ember-ui-pagination__load-more'],
  isLoadLess: false,

  didEnterViewport() {
    console.log('entered');
  },

  didExitViewport() {
    console.log('exited');
  }

  //attachEvents: Ember.on('didInsertElement', function () {
  //  var view = this;
  //  Ember.tryInvoke(view.get('handler'), 'loadMore');
  //}),

});
