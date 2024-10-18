import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Beer {
    id: ID!
    name: String!
    type: String!
    alcohol: Float!
    flavors: [String!]!
    origin: Origin!
  }

  type Origin {
    nationality: String!
  }

  type Query {
    getBeers: [Beer]
    getBeerById(id: ID!): Beer
  }
`;
