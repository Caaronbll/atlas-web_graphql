const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString }
    }
});

Module.exports = new GraphQLSchema({
    query: RootQuery
});