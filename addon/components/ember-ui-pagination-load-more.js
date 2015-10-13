import Ember from 'ember';

// TODO loading in opposite direction e.g. decrement page count

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['ember-ui-pagination__load-more'],
  isLoadLess: false,

  didInsertElement: function () {
    var view = this;
    this.$().on('inview', function (event, isInView) {
      if (view.get('handler.isLoaded') && isInView) {
        Ember.tryInvoke(view.get('handler'), 'loadMore');
      }
    });
  },

  willDestroyElement: function () {
    this.$().off('inview');
  }
});