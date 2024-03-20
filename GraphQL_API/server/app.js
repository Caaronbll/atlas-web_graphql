// Initial server file

// imports
const express = require('express');
const { graphqlHTTP }= require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

// Express App
const app = express();

// Connect to MongoDB
const uri = 'mongodb+srv://aaronbll46:Nikered333@cluster0.xnrspad.mongodb.net/'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// gQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Express local route
const _port = 4000
app.listen(_port,()=>{
  console.log(`now listening for request on port ${_port}`);
});