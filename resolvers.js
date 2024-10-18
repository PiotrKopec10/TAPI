import beers from './data/beers.json' assert { type: 'json' };

export const resolvers = {
  Query: {
    getBeers: () => beers.map(beer => ({
      id: beer.beer.id,
      name: beer.beer.details.name,
      type: beer.beer.details.attributes.type,
      alcohol: beer.beer.details.attributes.alcohol,
      flavors: beer.beer.details.attributes.flavors,
      origin: beer.beer.details.origin
    })),
    
    getBeerById: (_, { id }) => {
      const beer = beers.find(beer => beer.beer.id === parseInt(id));
      if (beer) {
        return {
          id: beer.beer.id,
          name: beer.beer.details.name,
          type: beer.beer.details.attributes.type,
          alcohol: beer.beer.details.attributes.alcohol,
          flavors: beer.beer.details.attributes.flavors,
          origin: beer.beer.details.origin
        };
      }
      return null;
    }
  }
};
