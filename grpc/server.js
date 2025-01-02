import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { beerResolvers } from '../resolvers/beerResolvers.js';

const PROTO_PATH = './grpc/proto/beer.proto';

// Ładowanie pliku .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const beerProto = grpc.loadPackageDefinition(packageDefinition).beer;

// Konfiguracja serwera
const server = new grpc.Server();
server.addService(beerProto.BeerService.service, beerResolvers);

server.bindAsync('127.0.0.1:50052', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`gRPC server running on port ${port}`);
  server.start();
});
