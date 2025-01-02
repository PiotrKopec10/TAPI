import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Scalar dla walidacji procentu alkoholu
  scalar AlcoholPercentage


# Typ filtrujący dla Beer
input BeerFilterInput {
  name: StringFilter
  type: StringFilter
  alcohol: NumberFilter
}

# Typ filtrujący dla stringów
input StringFilter {
  equals: String
  contains: String
  notEquals: String
  notContains: String
}

# Typ filtrujący dla liczb
input NumberFilter {
  equals: Float
  greaterThan: Float
  lessThan: Float
  greaterOrEquals: Float
  lessOrEquals: Float
}


  # Typ Beer
  type Beer {
    id: ID!
    name: String!
    type: String!
    alcohol: AlcoholPercentage!
  }

  

  # Typ Brewery
  type Brewery {
    id: ID!
    name: String!
    location: String!
  }

  # Typ Ingredient
  type Ingredient {
    id: ID!
    name: String!
    type: String!
  }

  # Input dla mutacji dodawania Beer
  input AddBeerInput {
    name: String!
    type: String!
    alcohol: AlcoholPercentage!
  }

  # Input dla mutacji dodawania Brewery
  input AddBreweryInput {
    name: String!
    location: String!
  }

  # Input dla mutacji dodawania Ingredient
  input AddIngredientInput {
    name: String!
    type: String!
  }

  # Filtry dla stringów
  input StringFilter {
    equals: String
    contains: String
    notEquals: String
    notContains: String
  }

  # Filtry dla liczb
  input NumberFilter {
    equals: Float
    greaterThan: Float
    lessThan: Float
    greaterOrEquals: Float
    lessOrEquals: Float
  }

  # Typ Query
  type Query {
    getBeers(filter: BeerFilterInput, sortBy: String, order: String): [Beer]
    getBeerById(id: ID!): Beer
    getBreweries: [Brewery]
    getBreweryById(id: ID!): Brewery
    getIngredients: [Ingredient]
    getIngredientById(id: ID!): Ingredient
  }

  # Typ Mutation
  type Mutation {
    addBeer(input: AddBeerInput!): Beer
    addBrewery(input: AddBreweryInput!): Brewery
    addIngredient(input: AddIngredientInput!): Ingredient
    deleteBeer(id: ID!): Boolean
    deleteBrewery(id: ID!): Boolean
    deleteIngredient(id: ID!): Boolean
    updateBeer(id: ID!, input: AddBeerInput!): Beer
    updateBrewery(id: ID!, input: AddBreweryInput!): Brewery
    updateIngredient(id: ID!, input: AddIngredientInput!): Ingredient
  }
`;
