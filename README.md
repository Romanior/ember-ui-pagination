# Ember UI Pagination Add-on 
[![Ember Observer Score](http://emberobserver.com/badges/ember-ui-pagination.svg)](http://emberobserver.com/addons/ember-ui-pagination) [![Build Status](https://travis-ci.org/Romanior/ember-ui-pagination.svg)](https://travis-ci.org/Romanior/ember-ui-pagination)

## [Demo](http://peaceful-beyond-1130.herokuapp.com/scrolling-exp)

## Motivation

Users very rarely paginate through many entries and pages, they tend to use filtering, sorting and ordering
to find records if they got more than 100 results. So let's create simple and very fast pagination on scrolling, to
give an overview of items.


## Running Test Application

* `git clone git@github.com:Romanior/ember-ui-pagination.git`
* `npm install && bower install`
* `ember server`
* Visit your app at `http://localhost:4200`


## Usage as add-on in your application

* `npm install --save-dev ember-ui-pagination`
* `ember g ember-ui-pagination`

```handlebars
 {{ember-ui-pagination
    store=store
    modelName='item'
    url='https://api.github.com/search/repositories?q=test1234'
    serverPagination=true
    page=1
  }}
```

Or with static data

```handlebars
 {{ember-ui-pagination
    store=store
    modelName='example'
    url='/data.csv'
    headers='id,method,url,hints,users,views'
  }}
```
where
* `modelName` - the name of the model where add-on loads data.
* `url` - URL to the server API, for server pagination it should support `page` and `per_page` params
* `page` - the page you want to start.
* `headers` - the CSV headers if you need to parse with with them.


You can overwrite templates in your application to adapt you data
* `app/templates/components/ember-ui-pagination.hbs`
* `app/templates/components/ember-ui-pagination-item.hbs`


## Running Tests

* `ember test`
* `ember test --server`
