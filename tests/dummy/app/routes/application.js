import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return Ember.$.get('/data.csv', function(data) {
      return new CSV(data, {
        header: ['id', 'method', 'counts', 'hints', 'users', 'views']
      }).parse();
    })

  }

});
