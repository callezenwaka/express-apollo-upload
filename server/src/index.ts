import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress, } from 'graphql-upload';
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import path from 'path';

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
  });
  
  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  // const directory: string = path.join(__dirname, '/public/');
  // app.use('/public/', express.static(directory));
  // const directory: string = path.join(__dirname, '/public');
  // app.use('/public', express.static(directory));
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(cors());
  app.use(graphqlUploadExpress());
  // app.use(graphqlUploadExpress({ maxFileSize: 10000, maxFiles: 10 }));

  server.applyMiddleware({ app });

  await new Promise<void>(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   csrfPrevention: false,
// });
// (async() => {
//   await server.start();
// })();

// const app = express();
// app.use(graphqlUploadExpress());
// app.use(express.static('public'));
// app.use(cors());
// server.applyMiddleware({ app });


// app.listen({ port: 4000}, () => {
//   console.log(`Server ready at http://localhost:4000${server.graphqlPath}.`);
// });