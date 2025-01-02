import beers from './data/beers.json' assert { type: "json" };
import fs from 'fs'; // Do zapisu danych do pliku beers.json

// Przykładowe dane dla breweries i ingredients bo mam tylko data dla beers
let breweries = [
  { id: 1, name: "BrewDog", location: "Scotland" },
  { id: 2, name: "Guinness", location: "Ireland" },
];

let ingredients = [
  { id: 1, name: "Hops", type: "Flavoring" },
  { id: 2, name: "Malt", type: "Base" },
];

export const resolvers = {
  Query: {
    // Pobieranie wszystkich piw z filtrowaniem i sortowaniem
    getBeers: (_, { filter, sortBy, order }) => {
      let filteredBeers = beers.piwka.map((beer) => ({
        id: beer.id,
        name: beer.name,
        type: beer.subName,
        alcohol: beer.iloscAlkoholu,
      }));

      // Filtrowanie
      if (filter) {
        if (filter.name) {
          if (filter.name.equals) {
            filteredBeers = filteredBeers.filter((beer) => beer.name === filter.name.equals);
          }
          if (filter.name.contains) {
            filteredBeers = filteredBeers.filter((beer) => beer.name.includes(filter.name.contains));
          }
        }
        if (filter.type) {
          if (filter.type.equals) {
            filteredBeers = filteredBeers.filter((beer) => beer.type === filter.type.equals);
          }
          if (filter.type.contains) {
            filteredBeers = filteredBeers.filter((beer) => beer.type.includes(filter.type.contains));
          }
        }
        if (filter.alcohol) {
          if (filter.alcohol.greaterThan) {
            filteredBeers = filteredBeers.filter((beer) => beer.alcohol > filter.alcohol.greaterThan);
          }
          if (filter.alcohol.lessThan) {
            filteredBeers = filteredBeers.filter((beer) => beer.alcohol < filter.alcohol.lessThan);
          }
        }
      }

      // Sortowanie
      if (sortBy) {
        filteredBeers = filteredBeers.sort((a, b) => {
          if (order === 'desc') {
            return b[sortBy] - a[sortBy];
          }
          return a[sortBy] - b[sortBy];
        });
      }

      return filteredBeers;
    },

    // Pobieranie piwa po ID
    getBeerById: (_, { id }) => {
      const beer = beers.piwka.find((b) => b.id === parseInt(id));
      if (!beer) {
        throw new Error(`Beer with ID ${id} not found`);
      }
      return {
        id: beer.id,
        name: beer.name,
        type: beer.subName,
        alcohol: beer.iloscAlkoholu,
      };
    },

    // Pobieranie browarów
    getBreweries: () => breweries,
    getBreweryById: (_, { id }) => {
      const brewery = breweries.find((b) => b.id === parseInt(id));
      if (!brewery) {
        throw new Error(`Brewery with ID ${id} not found`);
      }
      return brewery;
    },

    // Pobieranie składników
    getIngredients: () => ingredients,
    getIngredientById: (_, { id }) => {
      const ingredient = ingredients.find((i) => i.id === parseInt(id));
      if (!ingredient) {
        throw new Error(`Ingredient with ID ${id} not found`);
      }
      return ingredient;
    },
  },

  Mutation: {
    // Dodawanie nowego piwa
    addBeer: (_, { input }) => {
      const newBeer = {
        id: beers.piwka.length + 1,
        name: input.name,
        subName: input.type,
        iloscAlkoholu: input.alcohol,
      };
      beers.piwka.push(newBeer);

      // Zapisz zmiany do pliku
      fs.writeFileSync('./data/beers.json', JSON.stringify(beers, null, 2));

      return {
        id: newBeer.id,
        name: newBeer.name,
        type: newBeer.subName,
        alcohol: newBeer.iloscAlkoholu,
      };
    },

    // Aktualizacja piwa
    updateBeer: (_, { id, input }) => {
      const beerIndex = beers.piwka.findIndex((b) => b.id === parseInt(id));
      if (beerIndex === -1) {
        throw new Error(`Beer with ID ${id} not found`);
      }
      beers.piwka[beerIndex] = {
        ...beers.piwka[beerIndex],
        name: input.name || beers.piwka[beerIndex].name,
        subName: input.type || beers.piwka[beerIndex].subName,
        iloscAlkoholu: input.alcohol || beers.piwka[beerIndex].iloscAlkoholu,
      };

      fs.writeFileSync('./data/beers.json', JSON.stringify(beers, null, 2));
      return beers.piwka[beerIndex];
    },

    // Usuwanie piwa
    deleteBeer: (_, { id }) => {
      const beerIndex = beers.piwka.findIndex((b) => b.id === parseInt(id));
      if (beerIndex === -1) {
        throw new Error(`Beer with ID ${id} not found`);
      }
      beers.piwka.splice(beerIndex, 1);

      fs.writeFileSync('./data/beers.json', JSON.stringify(beers, null, 2));
      return true;
    },

    // Dodawanie nowego browaru
    addBrewery: (_, { input }) => {
      const newBrewery = {
        id: breweries.length + 1,
        name: input.name,
        location: input.location,
      };
      breweries.push(newBrewery);
      return newBrewery;
    },

    // Aktualizacja browaru
    updateBrewery: (_, { id, input }) => {
      const index = breweries.findIndex((b) => b.id === parseInt(id));
      if (index === -1) {
        throw new Error(`Brewery with ID ${id} not found`);
      }
      breweries[index] = { ...breweries[index], ...input };
      return breweries[index];
    },

    // Usuwanie browaru
    deleteBrewery: (_, { id }) => {
      const index = breweries.findIndex((b) => b.id === parseInt(id));
      if (index === -1) {
        throw new Error(`Brewery with ID ${id} not found`);
      }
      breweries.splice(index, 1);
      return true;
    },

    // Dodawanie nowego składnika
    addIngredient: (_, { input }) => {
      const newIngredient = {
        id: ingredients.length + 1,
        name: input.name,
        type: input.type,
      };
      ingredients.push(newIngredient);
      return newIngredient;
    },

    // Aktualizacja składnika
    updateIngredient: (_, { id, input }) => {
      const index = ingredients.findIndex((i) => i.id === parseInt(id));
      if (index === -1) {
        throw new Error(`Ingredient with ID ${id} not found`);
      }
      ingredients[index] = { ...ingredients[index], ...input };
      return ingredients[index];
    },

    // Usuwanie składnika
    deleteIngredient: (_, { id }) => {
      const index = ingredients.findIndex((i) => i.id === parseInt(id));
      if (index === -1) {
        throw new Error(`Ingredient with ID ${id} not found`);
      }
      ingredients.splice(index, 1);
      return true;
    },
  },
};
