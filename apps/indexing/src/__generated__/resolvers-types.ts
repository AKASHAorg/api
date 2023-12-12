import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  CacaoHeaderT: { input: any; output: any; }
  CacaoSignatureT: { input: any; output: any; }
};

export type Cacao_Capability = {
  h: CacaoHeader;
  p: CacaoPayload;
  s?: InputMaybe<CacaoSignature>;
};

export type CacaoHeader = {
  t: Scalars['CacaoHeaderT']['input'];
};

export type CacaoPayload = {
  aud: Scalars['String']['input'];
  domain: Scalars['String']['input'];
  exp?: InputMaybe<Scalars['String']['input']>;
  iat: Scalars['String']['input'];
  iss: Scalars['String']['input'];
  nbf?: InputMaybe<Scalars['String']['input']>;
  nonce: Scalars['String']['input'];
  requestId?: InputMaybe<Scalars['String']['input']>;
  resources?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  statement?: InputMaybe<Scalars['String']['input']>;
  version: Scalars['String']['input'];
};

export type CacaoSignature = {
  s: Scalars['String']['input'];
  t: Scalars['CacaoSignatureT']['input'];
};

export type Did_Jws = {
  payload: Scalars['String']['input'];
  signatures: Array<Jws_Signature>;
};

export type IndexAppPayload = {
  __typename?: 'IndexAppPayload';
  document?: Maybe<IndexAppPayloadDocument>;
};

export type IndexAppPayloadDocument = {
  __typename?: 'IndexAppPayloadDocument';
  applicationID: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type IndexBeamPayload = {
  __typename?: 'IndexBeamPayload';
  document?: Maybe<IndexBeamPayloadDocument>;
};

export type IndexBeamPayloadDocument = {
  __typename?: 'IndexBeamPayloadDocument';
  beamID: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type IndexContentBlockPayload = {
  __typename?: 'IndexContentBlockPayload';
  document?: Maybe<IndexContentBlockPayloadDocument>;
};

export type IndexContentBlockPayloadDocument = {
  __typename?: 'IndexContentBlockPayloadDocument';
  blockID: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type IndexInterestPayload = {
  __typename?: 'IndexInterestPayload';
  document?: Maybe<IndexInterestPayloadDocument>;
};

export type IndexInterestPayloadDocument = {
  __typename?: 'IndexInterestPayloadDocument';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  labelType: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type IndexProfilePayload = {
  __typename?: 'IndexProfilePayload';
  document?: Maybe<IndexProfilePayloadDocument>;
};

export type IndexProfilePayloadDocument = {
  __typename?: 'IndexProfilePayloadDocument';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  profileID: Scalars['String']['output'];
};

export type IndexReflectPayload = {
  __typename?: 'IndexReflectPayload';
  document?: Maybe<IndexReflectPayloadDocument>;
};

export type IndexReflectPayloadDocument = {
  __typename?: 'IndexReflectPayloadDocument';
  beamID: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  reflectionID: Scalars['String']['output'];
};

export type Jws_Signature = {
  protected: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  indexApp?: Maybe<IndexAppPayload>;
  indexBeam?: Maybe<IndexBeamPayload>;
  indexContentBlock?: Maybe<IndexContentBlockPayload>;
  indexInterest?: Maybe<IndexInterestPayload>;
  indexProfile?: Maybe<IndexProfilePayload>;
  indexReflection?: Maybe<IndexReflectPayload>;
};


export type MutationIndexAppArgs = {
  capability?: InputMaybe<Cacao_Capability>;
  jws?: InputMaybe<Did_Jws>;
};


export type MutationIndexBeamArgs = {
  capability?: InputMaybe<Cacao_Capability>;
  jws?: InputMaybe<Did_Jws>;
};


export type MutationIndexContentBlockArgs = {
  capability?: InputMaybe<Cacao_Capability>;
  jws?: InputMaybe<Did_Jws>;
};


export type MutationIndexInterestArgs = {
  capability?: InputMaybe<Cacao_Capability>;
  jws?: InputMaybe<Did_Jws>;
};


export type MutationIndexProfileArgs = {
  capability?: InputMaybe<Cacao_Capability>;
  jws?: InputMaybe<Did_Jws>;
};


export type MutationIndexReflectionArgs = {
  capability?: InputMaybe<Cacao_Capability>;
  jws?: InputMaybe<Did_Jws>;
};

export type Query = {
  __typename?: 'Query';
  serviceStatus?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CACAO_CAPABILITY: Cacao_Capability;
  CacaoHeader: CacaoHeader;
  CacaoHeaderT: ResolverTypeWrapper<Scalars['CacaoHeaderT']['output']>;
  CacaoPayload: CacaoPayload;
  CacaoSignature: CacaoSignature;
  CacaoSignatureT: ResolverTypeWrapper<Scalars['CacaoSignatureT']['output']>;
  DID_JWS: Did_Jws;
  IndexAppPayload: ResolverTypeWrapper<IndexAppPayload>;
  IndexAppPayloadDocument: ResolverTypeWrapper<IndexAppPayloadDocument>;
  IndexBeamPayload: ResolverTypeWrapper<IndexBeamPayload>;
  IndexBeamPayloadDocument: ResolverTypeWrapper<IndexBeamPayloadDocument>;
  IndexContentBlockPayload: ResolverTypeWrapper<IndexContentBlockPayload>;
  IndexContentBlockPayloadDocument: ResolverTypeWrapper<IndexContentBlockPayloadDocument>;
  IndexInterestPayload: ResolverTypeWrapper<IndexInterestPayload>;
  IndexInterestPayloadDocument: ResolverTypeWrapper<IndexInterestPayloadDocument>;
  IndexProfilePayload: ResolverTypeWrapper<IndexProfilePayload>;
  IndexProfilePayloadDocument: ResolverTypeWrapper<IndexProfilePayloadDocument>;
  IndexReflectPayload: ResolverTypeWrapper<IndexReflectPayload>;
  IndexReflectPayloadDocument: ResolverTypeWrapper<IndexReflectPayloadDocument>;
  JWS_Signature: Jws_Signature;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CACAO_CAPABILITY: Cacao_Capability;
  CacaoHeader: CacaoHeader;
  CacaoHeaderT: Scalars['CacaoHeaderT']['output'];
  CacaoPayload: CacaoPayload;
  CacaoSignature: CacaoSignature;
  CacaoSignatureT: Scalars['CacaoSignatureT']['output'];
  DID_JWS: Did_Jws;
  IndexAppPayload: IndexAppPayload;
  IndexAppPayloadDocument: IndexAppPayloadDocument;
  IndexBeamPayload: IndexBeamPayload;
  IndexBeamPayloadDocument: IndexBeamPayloadDocument;
  IndexContentBlockPayload: IndexContentBlockPayload;
  IndexContentBlockPayloadDocument: IndexContentBlockPayloadDocument;
  IndexInterestPayload: IndexInterestPayload;
  IndexInterestPayloadDocument: IndexInterestPayloadDocument;
  IndexProfilePayload: IndexProfilePayload;
  IndexProfilePayloadDocument: IndexProfilePayloadDocument;
  IndexReflectPayload: IndexReflectPayload;
  IndexReflectPayloadDocument: IndexReflectPayloadDocument;
  JWS_Signature: Jws_Signature;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
}>;

export interface CacaoHeaderTScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CacaoHeaderT'], any> {
  name: 'CacaoHeaderT';
}

export interface CacaoSignatureTScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CacaoSignatureT'], any> {
  name: 'CacaoSignatureT';
}

export type IndexAppPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexAppPayload'] = ResolversParentTypes['IndexAppPayload']> = ResolversObject<{
  document?: Resolver<Maybe<ResolversTypes['IndexAppPayloadDocument']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexAppPayloadDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexAppPayloadDocument'] = ResolversParentTypes['IndexAppPayloadDocument']> = ResolversObject<{
  applicationID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexBeamPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexBeamPayload'] = ResolversParentTypes['IndexBeamPayload']> = ResolversObject<{
  document?: Resolver<Maybe<ResolversTypes['IndexBeamPayloadDocument']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexBeamPayloadDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexBeamPayloadDocument'] = ResolversParentTypes['IndexBeamPayloadDocument']> = ResolversObject<{
  beamID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexContentBlockPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexContentBlockPayload'] = ResolversParentTypes['IndexContentBlockPayload']> = ResolversObject<{
  document?: Resolver<Maybe<ResolversTypes['IndexContentBlockPayloadDocument']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexContentBlockPayloadDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexContentBlockPayloadDocument'] = ResolversParentTypes['IndexContentBlockPayloadDocument']> = ResolversObject<{
  blockID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexInterestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexInterestPayload'] = ResolversParentTypes['IndexInterestPayload']> = ResolversObject<{
  document?: Resolver<Maybe<ResolversTypes['IndexInterestPayloadDocument']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexInterestPayloadDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexInterestPayloadDocument'] = ResolversParentTypes['IndexInterestPayloadDocument']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  labelType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexProfilePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexProfilePayload'] = ResolversParentTypes['IndexProfilePayload']> = ResolversObject<{
  document?: Resolver<Maybe<ResolversTypes['IndexProfilePayloadDocument']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexProfilePayloadDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexProfilePayloadDocument'] = ResolversParentTypes['IndexProfilePayloadDocument']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexReflectPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexReflectPayload'] = ResolversParentTypes['IndexReflectPayload']> = ResolversObject<{
  document?: Resolver<Maybe<ResolversTypes['IndexReflectPayloadDocument']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IndexReflectPayloadDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['IndexReflectPayloadDocument'] = ResolversParentTypes['IndexReflectPayloadDocument']> = ResolversObject<{
  beamID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reflectionID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  indexApp?: Resolver<Maybe<ResolversTypes['IndexAppPayload']>, ParentType, ContextType, Partial<MutationIndexAppArgs>>;
  indexBeam?: Resolver<Maybe<ResolversTypes['IndexBeamPayload']>, ParentType, ContextType, Partial<MutationIndexBeamArgs>>;
  indexContentBlock?: Resolver<Maybe<ResolversTypes['IndexContentBlockPayload']>, ParentType, ContextType, Partial<MutationIndexContentBlockArgs>>;
  indexInterest?: Resolver<Maybe<ResolversTypes['IndexInterestPayload']>, ParentType, ContextType, Partial<MutationIndexInterestArgs>>;
  indexProfile?: Resolver<Maybe<ResolversTypes['IndexProfilePayload']>, ParentType, ContextType, Partial<MutationIndexProfileArgs>>;
  indexReflection?: Resolver<Maybe<ResolversTypes['IndexReflectPayload']>, ParentType, ContextType, Partial<MutationIndexReflectionArgs>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  serviceStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CacaoHeaderT?: GraphQLScalarType;
  CacaoSignatureT?: GraphQLScalarType;
  IndexAppPayload?: IndexAppPayloadResolvers<ContextType>;
  IndexAppPayloadDocument?: IndexAppPayloadDocumentResolvers<ContextType>;
  IndexBeamPayload?: IndexBeamPayloadResolvers<ContextType>;
  IndexBeamPayloadDocument?: IndexBeamPayloadDocumentResolvers<ContextType>;
  IndexContentBlockPayload?: IndexContentBlockPayloadResolvers<ContextType>;
  IndexContentBlockPayloadDocument?: IndexContentBlockPayloadDocumentResolvers<ContextType>;
  IndexInterestPayload?: IndexInterestPayloadResolvers<ContextType>;
  IndexInterestPayloadDocument?: IndexInterestPayloadDocumentResolvers<ContextType>;
  IndexProfilePayload?: IndexProfilePayloadResolvers<ContextType>;
  IndexProfilePayloadDocument?: IndexProfilePayloadDocumentResolvers<ContextType>;
  IndexReflectPayload?: IndexReflectPayloadResolvers<ContextType>;
  IndexReflectPayloadDocument?: IndexReflectPayloadDocumentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

