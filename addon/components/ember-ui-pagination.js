import Ember from 'ember';

/**
 * Ember UI pagination add-on
 * Can manipulate with static data, or paginate by a server
 *
 *
 * TODO: calculate the number of items based on the viewport height, recalculate on resize
 *       I'm using now just a large sensible number, in case if it is too few, it'd load more immediately.
 *
 * TODO load data and work in backward direction, e.g. user scrolled, click on item, went back, or went with QP
 * TODO think about how to deal with different JSON server outputs
 * TODO query params on parent controller? useQueryParams parameter support, without by default
 *
 */


export default Ember.Component.extend({
  classNames:       ['ember-ui-pagination'],
  tagName:          'ul',
  page:             0,
  perPage:          50,
  modelName:        '',
  isLoaded:         false,
  isLoadingMore:    false,
  serverPagination: false,
  staticContent:    null,
  visibleContent:   Ember.A(),

  canLoadMore: Ember.computed('page', 'perPage', function () {
    return true;
    }
//  @get('currOffset') < @get('paginationTotal')
  ),


  setupData: Ember.on('init', function () {
    var component        = this,
        url              = this.get('url'),
        csvHeaders       = this.get('headers'),
        page             = this.get('page'),
        perPage          = this.get('perPage'),
        serverPagination = this.get('serverPagination');

    if (typeof csvHeaders === 'string') {
      csvHeaders = csvHeaders.split(',');
    }

    this.getData(page, perPage).then(function (result) {
      var parsed = result;
      if (!serverPagination) { // cache all results
        component.staticContent = component._parseStaticContent(parsed, csvHeaders);
        parsed                  = component.staticContent.slice(page * perPage, perPage);
      }
      component.set('visibleContent', component.loadDataToStore(parsed));
      component.set('isLoaded', true);
    });
  }),

  _parseStaticContent: function (data, headers) {
    var parsed;
    try {
      parsed = new CSV(data, {
        header: headers
      }).parse();
    }
    catch (e) {
      throw e;
    }
    return parsed;
  },

  loadDataToStore: function (data) {
    var store     = this.get('store'),
        modelName = this.get('modelName'),
        key       = Ember.String.pluralize(modelName),
        manyArray;

    Ember.assert('modelName should be model you want to load the data', typeof modelName === 'string');
    manyArray     = store.pushMany(modelName.toLowerCase(), data[key] || data);
    return Ember.A(manyArray);
  },

  loadMore: function (isOpposite) {
    if (!isOpposite) {
      this.incrementProperty('page');
    }
  },


  getData: function (page, perPage) {
    var staticContent = this.get('staticContent'),
        params        = {page: page, per_page: perPage};
    if (Ember.isArray(staticContent)) {
      return Ember.RSVP.cast(staticContent.slice(page * perPage, page * perPage + perPage))
    }
    else {
      return myAjax(this.get('url'), params)
    }
  },

  processContent: Ember.observer('page', 'perPage', function () {
    var page           = this.get('page'),
        perPage        = this.get('perPage'),
        component      = this,
        visibleContent = this.get('visibleContent'),
        loadedData;

    this.getData(page, perPage).then(function (data) {
      loadedData = component.loadDataToStore(data);
      visibleContent.addObjects(loadedData);
    })
  })

});


function myAjax(url, params) {
  var pr = Ember.$.get(url, params);
  return pr.then(function (data) {
    return data
  })
}
