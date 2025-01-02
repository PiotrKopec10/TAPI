import express from 'express'; // Framework Express.js
import cors from 'cors'; // Middleware dla CORS
import beerRoutes from './beerRoutes.js'; // Trasy REST API dla piw
import breweryRoutes from './breweryRoutes.js'; // Trasy REST API dla browarów
import ingredientRoutes from './ingredientRoutes.js'; // Trasy REST API dla składników
import { ApolloServer } from 'apollo-server-express'; // GraphQL Server
import { typeDefs } from '../schema.js'; // Schema GraphQL
import { resolvers } from '../resolvers.js'; // Resolvers - logika GraphQL

const app = express(); // Inicjalizacja aplikacji Express
const port = 3000; // Port, na którym działa serwer

// Middleware do przetwarzania JSON
app.use(express.json());

// Middleware CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'https://studio.apollographql.com'], // Zezwól na lokalny Playground i Apollo Studio
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Dozwolone metody HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Dozwolone nagłówki
    credentials: true, // Zezwól na ciasteczka (opcjonalne)
};
app.use(cors(corsOptions));

// Middleware ustawiający nagłówki HTTP
app.use((req, res, next) => {
    res.set("Content-Type", "application/json"); // Typ odpowiedzi
    res.set("X-Powered-By", "MyAPI"); // Nagłówek informacyjny
    next();
});

// Podłączenie tras REST API
app.use('/api', beerRoutes); // Trasy dla zasobu "piwa"
app.use('/api', breweryRoutes); // Trasy dla zasobu "browary"
app.use('/api', ingredientRoutes); // Trasy dla zasobu "składniki"

// Konfiguracja Apollo Server dla GraphQL
const server = new ApolloServer({
    typeDefs, // Twoja schema GraphQL
    resolvers, // Twoje resolvers
    introspection: true, // Umożliwia introspekcję (ważne dla Apollo Studio)
    playground: true, // Aktywuje lokalny Playground
});

// Start Apollo Server
await server.start();
server.applyMiddleware({
    app,
    cors: {
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'], // Zezwól na dostęp dla Studio i lokalnego Playground
        credentials: true, // Zezwól na ciasteczka (opcjonalne)
    },
});

// Uruchomienie serwera
app.listen(port, () => {
   
    console.log(`Serwer działa na porcie ${port}`); // Informacja o działającym serwerze REST API
    console.log(`GraphQL działa na adresie http://localhost:${port}${server.graphqlPath}`); // Informacja o adresie GraphQL
});
