import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

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

// Konfiguracja klienta
const client = new beerProto.BeerService(
  '127.0.0.1:50052',
  grpc.credentials.createInsecure()
);

// Testowanie GetBeers
client.GetBeers({ nameContains: "Heineken", alcoholGreaterThan: 4.5 }, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Beers:', response.beers);
});

// Testowanie GetBeerById
client.GetBeerById({ id: 2 }, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Beer:', response.beer);
});

// Testowanie AddBeer
client.AddBeer({ name: "New Beer", type: "IPA", alcohol: 6.5 }, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Added Beer:', response.beer);
});
