// imports
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const _ = require('lodash');

// importing models
const Project = require('../models/project');
const Task = require('../models/task');

/*   Dummy DATA   */
/*
// tasks data
const tasks = [
    { projectId: '1', id: '1', title: 'Create your first webpage', weight: 1, description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)' },
    { projectId: '1', id: '2', title: 'Structure your webpage', weight: 1, description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order' }
];

// projects data

const projects = [
    { id: '1', title: 'Advanced HTML', weight: 1, description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!' },
    { id: '2', title: 'Bootstrap', weight: 1, description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.' }
];
*/

/*     TYPES    */

// TaskType object
const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        project: { 
            type: ProjectType,
            resolve(parent, args) {
                // Find the project by ID using lodash
                return _.find(projects, { id: parent.projectId });
            }
        }
    })
});

// ProjectType object
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                // Filter tasks by projectId
                return _.filter(task, { projectId: parent.id });
            }
        }
    })
});

// RootQueryType object
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // task field
        task: {
            type: TaskType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // Find the task by ID using lodash
                return _.find(tasks, { id: args.id });
            }
        },
        // project field
        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // Find the task by ID using lodash
                return _.find(tasks, { id: args.id });
            }
        },
        // all tasks field
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                // Return all tasks
                return tasks;
            }
        },
        // all projects field
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                // Return all projects
                return projects;
            }
        }
    }
});

/*     Mutations    */

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add project
        addProject: {
            type: ProjectType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) }
              },
              resolve(parent, args) {
                let project = new Project({
                  title: args.title,
                  weight: args.weight,
                  description: args.description
                });
                return project.save();
              }
        },
        // add task
        addTask: {
            type: TaskType,
            args: {
              title: { type: new GraphQLNonNull(GraphQLString) },
              weight: { type: new GraphQLNonNull(GraphQLInt) },
              description: { type: new GraphQLNonNull(GraphQLString) },
              projectId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let task = new Task({
                  title: args.title,
                  weight: args.weight,
                  description: args.description,
                  projectId: args.projectId
                });
                return task.save();
            }
        }
    }
});


// Exporting RootQueryType
module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
});