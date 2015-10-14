import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-ui-pagination-load-more', 'Integration | Component | ember ui pagination load more', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-ui-pagination-load-more}}`);

  assert.equal(this.$().text().trim(), '');
});
