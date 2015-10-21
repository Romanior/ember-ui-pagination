import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

// TODO loading in opposite direction e.g. decrement page count

export default Ember.Component.extend(InViewportMixin, {
  tagName: 'li',
  classNames: ['ember-ui-pagination__load-more'],
  isLoadLess: false,

  viewportOptionsOverride: Ember.on('didInsertElement', function() {
    Ember.setProperties(this, {
      viewportSpy :true
    });
  }),

  didEnterViewport() {
    Ember.tryInvoke(this.get('parentView'), 'loadMore');
  },

  didExitViewport() {
    console.log('exited');
  }
});
