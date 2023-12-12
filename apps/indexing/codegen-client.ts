import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'config/composedb-schema.graphql',
  documents: ['apps/indexing/src/client.graphql'],
  emitLegacyCommonJSImports: false,
  generates: {
    'apps/indexing/src/__generated__/composedb-client.ts': {
      config: {
        federation: true,
        dedupeOperationSuffix: true,
        dedupeFragments: true,
        pureMagicComment: true,
        skipTypename: true,
      },
      plugins: ['typescript', 'typescript-operations', '@graphql-codegen/typescript-generic-sdk'],
    },
  },
};
export default config;
