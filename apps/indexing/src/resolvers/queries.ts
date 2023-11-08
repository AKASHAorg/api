import { QueryResolvers } from '../__generated__/resolvers-types.js';

const queries: QueryResolvers = {
  serviceStatus: async (_, __, { dataSources }) => {
    return "ok";
  },
};

export default queries;

