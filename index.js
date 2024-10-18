import express from 'express';
import beerRoutes from './routes/beerRoutes.js';
import { ApolloServer } from 'apollo-server-express'; 
import { typeDefs } from './schema.js'; 
import { resolvers } from './resolvers.js'; 

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', beerRoutes); 


const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
    console.log(`GraphQL działa na adresie http://localhost:${port}${server.graphqlPath}`);
});
