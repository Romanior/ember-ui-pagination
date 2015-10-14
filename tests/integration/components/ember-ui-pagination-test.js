import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-ui-pagination', 'Integration | Component | ember ui pagination', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  assert.throws( function(){ this.render(hbs`{{ember-ui-pagination}}`); }, 'Should throws assertion, because we render without url');

});
