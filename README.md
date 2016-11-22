# Ember UI Pagination Showcase
## [Demo](http://peaceful-beyond-1130.herokuapp.com/scrolling-exp)

## Running Test Application

* `git clone git@github.com:Romanior/ember-ui-pagination.git`
* `npm install && bower install`
* `ember s`
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

Or with static data, CSV or JSON are supported. CSV file will be parsed to JSON, you
may support with additional `csvHeaders` parameters if the .csv file does not have them
one the first row.

```handlebars
 {{ember-ui-pagination
    store=store
    modelName='example'
    url='/data.csv'
    csvHeaders='id,method,url,hints,users,views'
  }}
```

```handlebars
 {{ember-ui-pagination
    store=store
    modelName='example'
    url='/data.json'
  }}
```

where
* `modelName` - the name of the model where add-on loads data.
* `url` - URL to the server API, for server pagination it should support `page` and `per_page` params
* `page` - the page you want to start.
* `csvHeaders` - the CSV headers if you need to parse with with them.


You can overwrite templates in your application to adapt your data
* `app/templates/components/ember-ui-pagination.hbs`
* `app/templates/components/ember-ui-pagination-item.hbs`


## Running Tests

* `ember test`
* `ember test --server`
