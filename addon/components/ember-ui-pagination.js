import Ember from 'ember';

/**
 * Ember UI pagination add-on
 * Can manipulate with static data, or paginate by a server
 *
 *
 * TODO: calculate the number of items based on the viewport height, recalculate on resize
 *       I'm using now just a large sensible number, in case if it is too few, it'd load more immediately.
 *       UPD, it seems for me now it should not matter much
 *
 * TODO load data and work in backward direction, e.g. user scrolled, click on item, went back, or went with QP
 * TODO think about how to deal with different JSON server outputs
 * TODO query params on parent controller? useQueryParams parameter support, without by default
 * TODO page counter, how many results are displayed, left?
 *
 *
 *
 *  Expected JSON server output
 *
 *  {
 *    total_count: <Number>
 *    modelNamePlural: []
 *  }
 *
 *  Server should support 'page' and 'per_page' parameters
 *
 */


const {
  setProperties,
  assert,
  } = Ember;

export default Ember.Component.extend({
  classNames:       ['ember-ui-pagination__wrapper'],
  tagName:          'div',
  page:             0,
  perPage:          25,
  modelName:        '',
  isLoaded:         false,
  isLoadingMore:    false,
  serverPagination: false,
  staticContent:    null,
  visibleContent:   Ember.A(),
  totalCount:       null,

  canLoadMore: Ember.computed('page', 'perPage', 'totalCount', 'isLoaded', function () {
      var page       = this.get('page'),
          perPage    = this.get('perPage'),
          totalCount = this.get('totalCount'),
          isLoaded   = this.get('isLoaded');

      if (!isLoaded) {
        return false;
      }

      return (page * perPage + perPage) < totalCount;
    }
  ).readOnly(),

  /**
   * Setup data when component has inserted to DOM
   * Load the first portion, parse static data, if needed
   * and set information about total number
   *
   */

  setupData: Ember.on('didInsertElement', function () {
    var component        = this,
        csvHeaders       = this.get('headers'),
        page             = this.get('page'),
        perPage          = this.get('perPage'),
        serverPagination = this.get('serverPagination');

    if (typeof csvHeaders === 'string') {
      csvHeaders = csvHeaders.split(',');
    }

    this.getData(page, perPage).then(function (result) {
      var parsed = result;

      if (!serverPagination && csvHeaders) { // cache all results
        component.staticContent = component._parseStaticContent(parsed, csvHeaders);
        parsed                  = component.staticContent.slice(page * perPage, perPage);
      }

      setProperties(component, {
        'totalCount':     result['total_count'] || result.length,
        'visibleContent': component.loadDataToStore(parsed),
        'isLoaded':       true
      });
    });
  }),

  // TODO think about to use just visibleContent as computed array (page, perPage, totalCount...)
  processContent: Ember.observer('page', 'perPage', function () {
    var page         = this.get('page'),
      perPage        = this.get('perPage'),
      component      = this,
      visibleContent = this.get('visibleContent'),
      loadedData;

    this.getData(page, perPage).then(function (data) {
      loadedData = component.loadDataToStore(data);
      visibleContent.addObjects(loadedData);
      component.set('isLoadingMore', false);
    });
  }),

  loadDataToStore: function (data) {
    var store     = this.get('store'),
        modelName = this.get('modelName'),
        key       = Ember.String.pluralize(modelName),
        manyArray;

    assert('modelName should be model you want to load the data', modelName);
    assert('please set store to load data to', store);

    if (data && store) {
      manyArray = store.pushMany(modelName.toLowerCase(), data[key] || data);
      return Ember.A(manyArray);
    }
  },

  loadMore: function () {
    var canLoadMore = this.get('canLoadMore'),
        isLoadingMore = this.get('isLoadingMore');

    if (!isLoadingMore && canLoadMore) {
      this.set('isLoadingMore', true);
      this.incrementProperty('page');
    }
  },

  getData: function (page, perPage) {
    var staticContent = this.get('staticContent'),
        params        = {page: page, per_page: perPage},
        url           = this.get('url');

    assert('please set url to load data from', url);

    if (Ember.isArray(staticContent)) {
      return Ember.RSVP.cast(staticContent.slice(page * perPage, page * perPage + perPage));
    }
    else {
      return this._ajax(url, params);
    }
  },

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

  _ajax: function (url, params) {
    var pr = Ember.$.get(url, params);
    return pr.then(function (data) {
      return data;
    });
  }
});
