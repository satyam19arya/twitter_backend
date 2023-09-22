import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import express from 'express';

export async function createApp() {
    const app = express();
    app.use(bodyParser.json());
    const server = new ApolloServer({
        typeDefs: `
            type Query { 
                hello: String
            }

            type Mutation {
                addMessage(message: String!): String
            }
        `, 
        resolvers: {
            Query: {
                hello: () => 'hello world',
            },

            Mutation: {
                addMessage: (_, { message }) => {
                    return message;
                }
            }
        },
    });

    await server.start();
    app.use('/graphql', expressMiddleware(server));
    return app;
}