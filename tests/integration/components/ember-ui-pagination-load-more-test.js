import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

// TODO import config from initializers/viewport-config.js
const config = {
  viewportSpy: false,
  viewportScrollSensitivity: 1,
  viewportRefreshRate: 100,
  viewportListeners: [
    { context: window, event: 'scroll.scrollable' },
    { context: window, event: 'resize.resizable' },
    { context: document, event: 'touchmove.scrollable' }
  ],
  viewportTolerance: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
};

moduleForComponent('ember-ui-pagination-load-more', 'Integration | Component | ember ui pagination load more', {
  integration: true,
  beforeEach: function () {
    this.container.register('config:in-viewport', config, {instantiate: false});
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-ui-pagination-load-more}}`);
  assert.equal(this.$('.ember-ui-pagination__load-more').length, 1);
});
