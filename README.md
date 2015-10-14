# Ember UI Pagination Add-on

## Motivation

Users very rarely paginate through many entries and pages, they tend to use filtering, sorting and ordering
to find records if they got more than 100 results. So let's create simple and very fast pagination on scrolling, to
give an overview of items.

## Usage

`npm install --save-dev ember-ui-pagination`

```
 {{ember-ui-pagination
    store=store
    modelName='item'
    url='https://api.github.com/search/repositories?q=test1234'
    serverPagination=true
    page=1
  }}
```
where
* `modelName` - the name of the model where add-on loads data.
* `url` - URL to the server API, for server pagination it should support `page` and `per_page` params
* `page` - the page you want to start.


## Running Dummy Application

* `git clone git@github.com:Romanior/ember-ui-pagination.git`
* `npm install && bower install`
* `ember server`
* Visit your app at `http://localhost:4200`


## Running Tests

* `ember test`
* `ember test --server`
