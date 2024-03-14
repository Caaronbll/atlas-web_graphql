const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");


// Define the TaskType GraphQL object type
const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString }
    }
});

// Define the RootQueryType GraphQL object type
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                // Placeholder resolve function
                // Here you would typically fetch data from the database based on the provided id
                // For now, we'll just return a static task object
                return {
                    id: args.id,
                    title: 'Sample Task',
                    weight: 1,
                    description: 'This is a sample task'
                };
            }
        }
    }
});

Module.exports = new GraphQLSchema({
    query: RootQuery
});