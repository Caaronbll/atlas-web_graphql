// Initial server file

// imports
const express = require('express');
const { graphqlHTTP }= require('express-graphql');
const schema = require('./schema/schema');

// Express App
const app = express();

// gQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Express local route
app.listen(2000,()=>{
  console.log('now listening for request on port 4000');
});