# diff-analyzer

## Getting Started
### Prerequisites
For running the project, you need the following to be installed on your machine

Node, npm, MongoDB

### Installing
if MongoDB isn't currently running on your machine, start it with
```
mongod
```

Clone the project
In the project file, install all required dependencies with
```
npm install
```

To start the application
```
npm start
```

By default, the application will run on http://localhost:3000/

### Using
Currently, the easies way to use the application is with the Postman. 

POST request to <strong>localhost:3000/v1/diff/1/right</strong> with type JSON/(application json) and request body
```
{
    "content": "test item 1 right"
}
```
will add item with type equal right and given id equal 1 to the database.

The same request to <strong>localhost:3000/v1/diff/1/left</strong> will add item with type equal left and the same given id.

GET request to <strong>localhost:3000/v1/diff/1</strong> will return the comparison result between two items.

## Running the tests
Jest.js is used as test runner. Use 
```
npm test
```
to run tests.