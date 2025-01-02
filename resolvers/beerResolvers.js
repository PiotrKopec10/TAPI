import beers from '../data/beers.json' assert { type: "json" };

export const beerResolvers = {
  GetBeers: (call, callback) => {
    let filteredBeers = beers.piwka;

    const { nameContains, typeContains, alcoholGreaterThan, alcoholLessThan } = call.request;

    if (nameContains) {
      filteredBeers = filteredBeers.filter((beer) => beer.name.includes(nameContains));
    }
    if (typeContains) {
      filteredBeers = filteredBeers.filter((beer) => beer.subName.includes(typeContains));
    }
    if (alcoholGreaterThan) {
      filteredBeers = filteredBeers.filter((beer) => beer.iloscAlkoholu > alcoholGreaterThan);
    }
    if (alcoholLessThan) {
      filteredBeers = filteredBeers.filter((beer) => beer.iloscAlkoholu < alcoholLessThan);
    }

    const response = filteredBeers.map((beer) => ({
      id: beer.id,
      name: beer.name,
      type: beer.subName,
      alcohol: beer.iloscAlkoholu,
    }));

    callback(null, { beers: response });
  },

  GetBeerById: (call, callback) => {
    const beer = beers.piwka.find((b) => b.id === call.request.id);

    if (!beer) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: `Beer with ID ${call.request.id} not found`,
      });
    }

    callback(null, {
      beer: {
        id: beer.id,
        name: beer.name,
        type: beer.subName,
        alcohol: beer.iloscAlkoholu,
      },
    });
  },

  AddBeer: (call, callback) => {
    const newBeer = {
      id: beers.piwka.length + 1,
      name: call.request.name,
      subName: call.request.type,
      iloscAlkoholu: call.request.alcohol,
    };

    beers.piwka.push(newBeer);

    callback(null, {
      beer: {
        id: newBeer.id,
        name: newBeer.name,
        type: newBeer.subName,
        alcohol: newBeer.iloscAlkoholu,
      },
    });
  },
};
