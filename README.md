# Waterline 

An adapter-based ORM for node.js

---

Waterline is available via NPM.

```
$ npm install --save waterline
```

To get started with Waterline as a standalone module, we need two ingredients: adapters and model definitions.

## [What is an adapter?](https://sailsjs.com/documentation/concepts/extending-sails/adapters)

In Waterline, database adapters (often simply called "adapters", for short) allow the models in your app to communicate
with your database(s). In other words, when your code in a controller action or helper calls a model method like 
User.find(), what happens next is determined by the configured adapter.

**Available database adapters**

| Database technology  | Adapter                     | Connection URL structure                        | For production? |
|----------------------|-----------------------------|-------------------------------------------------|-----------------|
| MySQL	               | require('sails-mysql')	     | mysql://user:password@host:port/database	       | Yes             |
| PostgreSQL	          | require('sails-postgresql') | 	postgresql://user:password@host:port/database	 | Yes             |
| MongoDB              | 	require('sails-mongo')	    | mongodb://user:password@host:port/database	     | Yes             |
| Local disk / memory	 | (built-in, see sails-disk)  | 	n/a                                            | 	No!            |

## [Datastores](https://sailsjs.com/documentation/reference/waterline-orm/datastores)

Datastores represent the data sources configured for your app. A datastore usually represents a particular database, 
whether that's a database running within a locally installed MySQL server, a remote PostgreSQL database running in your 
company's data center, or a remote MongoDB database hosted by a cloud provider.

## [Models](https://sailsjs.com/documentation/concepts/models-and-orm/models)

A model represents a set of structured data, called records. Models usually correspond to a table/collection in a 
database, attributes correspond to columns/fields, and records correspond to rows/documents.

**Custom model methods**

You can also define your own custom model methods. Custom model methods are most useful for extrapolating controller 
code that relates to a particular model.

**[Model settings](https://sailsjs.com/documentation/concepts/models-and-orm/model-settings)**

Model settings allow you to customize the behavior of the models in your Sails app. They can be specified on a per-model
basis by setting top-level properties in a model definition

**[Lifecycle callbacks](https://sailsjs.com/documentation/concepts/models-and-orm/lifecycle-callbacks)**

Lifecycle callbacks are functions that are called before or after certain model methods

**[Waterline query language](https://sailsjs.com/documentation/concepts/models-and-orm/query-language)**

The syntax supported model methods is called Waterline Query Language. Waterline knows how to interpret this 
syntax to retrieve or mutate records from any supported database. Under the covers, Waterline uses the database adapter(s)
installed in your project to translate this language into native queries and send those queries to the appropriate
database. This means that you can use the same query with MySQL as you do with Redis or MongoDB. It also means that you 
can change your database with minimal (if any) changes to your application code.

## [Queries](https://sailsjs.com/documentation/reference/waterline-orm/queries)

Queries (aka query instances) are the chainable deferred objects returned from model methods like `.find()` and `.create()`.
They represent a not-quite-yet-fulfilled intent to fetch or modify records from the database.

```ts
const zookeepers = await Zookeeper.find();
```

In this example, the call to `Zookeeper.find()` returns a query instance, but doesn't actually do anything until it is
executed using the `await` keyword, and then the result is assigned to the `zookeepers` variable.

## [Records](https://sailsjs.com/documentation/reference/waterline-orm/records)

Records come from model methods like `.find()` and represent data from your database. You can work with records just like
you would any other data.

```ts
const orders = await Order.find();
// `orders` is an array of records
```
