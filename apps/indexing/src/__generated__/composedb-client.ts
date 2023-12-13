import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
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
  /** A Ceramic Commit ID */
  CeramicCommitID: { input: any; output: any; }
  /** A Ceramic Stream ID */
  CeramicStreamID: { input: any; output: any; }
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A IPLD CID */
  InterPlanetaryCID: { input: any; output: any; }
  /** A field whose value conforms to the standard Uniform Resource Identifier (URI) format as specified in RFC3986. */
  URI: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type AkashaApp = Node & {
  applicationType?: Maybe<AkashaAppApplicationType>;
  /** Account controlling the document */
  author: CeramicAccount;
  contributors?: Maybe<Array<Maybe<CeramicAccount>>>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  licence: Scalars['String']['output'];
  name: Scalars['String']['output'];
  releases: AkashaAppReleaseConnection;
  releasesCount: Scalars['Int']['output'];
  /** Current version of the document */
  version: Scalars['CeramicCommitID']['output'];
};


export type AkashaAppReleasesArgs = {
  account?: InputMaybe<Scalars['ID']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaAppReleaseFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaAppReleaseSortingInput>;
};


export type AkashaAppReleasesCountArgs = {
  account?: InputMaybe<Scalars['ID']['input']>;
  filters?: InputMaybe<AkashaAppReleaseFiltersInput>;
};

export enum AkashaAppApplicationType {
  App = 'APP',
  Other = 'OTHER',
  Plugin = 'PLUGIN',
  Widget = 'WIDGET'
}

export type AkashaAppApplicationTypeValueFilterInput = {
  equalTo?: InputMaybe<AkashaAppApplicationType>;
  in?: InputMaybe<Array<AkashaAppApplicationType>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEqualTo?: InputMaybe<AkashaAppApplicationType>;
  notIn?: InputMaybe<Array<AkashaAppApplicationType>>;
};

/** A connection to a list of items. */
export type AkashaAppConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaAppEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaAppEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaApp>;
};

export type AkashaAppFiltersInput = {
  and?: InputMaybe<Array<AkashaAppFiltersInput>>;
  not?: InputMaybe<AkashaAppFiltersInput>;
  or?: InputMaybe<Array<AkashaAppFiltersInput>>;
  where?: InputMaybe<AkashaAppObjectFilterInput>;
};

export type AkashaAppInput = {
  applicationType?: InputMaybe<AkashaAppApplicationType>;
  contributors?: InputMaybe<Array<InputMaybe<Scalars['DID']['input']>>>;
  createdAt: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  licence: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type AkashaAppObjectFilterInput = {
  applicationType?: InputMaybe<AkashaAppApplicationTypeValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  displayName?: InputMaybe<StringValueFilterInput>;
  name?: InputMaybe<StringValueFilterInput>;
};

export type AkashaAppRelease = Node & {
  application?: Maybe<AkashaApp>;
  applicationID: Scalars['CeramicStreamID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  source: Scalars['InterPlanetaryCID']['output'];
  version: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type AkashaAppReleaseConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaAppReleaseEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaAppReleaseEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaAppRelease>;
};

export type AkashaAppReleaseFiltersInput = {
  and?: InputMaybe<Array<AkashaAppReleaseFiltersInput>>;
  not?: InputMaybe<AkashaAppReleaseFiltersInput>;
  or?: InputMaybe<Array<AkashaAppReleaseFiltersInput>>;
  where?: InputMaybe<AkashaAppReleaseObjectFilterInput>;
};

export type AkashaAppReleaseInput = {
  applicationID: Scalars['CeramicStreamID']['input'];
  createdAt: Scalars['DateTime']['input'];
  source: Scalars['InterPlanetaryCID']['input'];
  version: Scalars['String']['input'];
};

export type AkashaAppReleaseObjectFilterInput = {
  applicationID?: InputMaybe<StringValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  version?: InputMaybe<StringValueFilterInput>;
};

export type AkashaAppReleaseSortingInput = {
  applicationID?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  version?: InputMaybe<SortOrder>;
};

export type AkashaAppSortingInput = {
  applicationType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  displayName?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type AkashaAppsStream = Node & {
  active: Scalars['Boolean']['output'];
  application?: Maybe<AkashaApp>;
  applicationID: Scalars['CeramicStreamID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  moderationID?: Maybe<Scalars['CeramicStreamID']['output']>;
  status?: Maybe<AkashaAppsStreamModerationStatus>;
};

/** A connection to a list of items. */
export type AkashaAppsStreamConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaAppsStreamEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaAppsStreamEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaAppsStream>;
};

export type AkashaAppsStreamFiltersInput = {
  and?: InputMaybe<Array<AkashaAppsStreamFiltersInput>>;
  not?: InputMaybe<AkashaAppsStreamFiltersInput>;
  or?: InputMaybe<Array<AkashaAppsStreamFiltersInput>>;
  where?: InputMaybe<AkashaAppsStreamObjectFilterInput>;
};

export type AkashaAppsStreamInput = {
  active: Scalars['Boolean']['input'];
  applicationID: Scalars['CeramicStreamID']['input'];
  createdAt: Scalars['DateTime']['input'];
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  status?: InputMaybe<AkashaAppsStreamModerationStatus>;
};

export enum AkashaAppsStreamModerationStatus {
  InReview = 'IN_REVIEW',
  Nsfw = 'NSFW',
  Ok = 'OK',
  Other = 'OTHER',
  Removed = 'REMOVED',
  Suspended = 'SUSPENDED'
}

export type AkashaAppsStreamModerationStatusValueFilterInput = {
  equalTo?: InputMaybe<AkashaAppsStreamModerationStatus>;
  in?: InputMaybe<Array<AkashaAppsStreamModerationStatus>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEqualTo?: InputMaybe<AkashaAppsStreamModerationStatus>;
  notIn?: InputMaybe<Array<AkashaAppsStreamModerationStatus>>;
};

export type AkashaAppsStreamObjectFilterInput = {
  active?: InputMaybe<BooleanValueFilterInput>;
  applicationID?: InputMaybe<StringValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  moderationID?: InputMaybe<StringValueFilterInput>;
  status?: InputMaybe<AkashaAppsStreamModerationStatusValueFilterInput>;
};

export type AkashaAppsStreamSortingInput = {
  active?: InputMaybe<SortOrder>;
  applicationID?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  moderationID?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
};

export type AkashaBeam = Node & {
  active: Scalars['Boolean']['output'];
  /** Account controlling the document */
  author: CeramicAccount;
  content: Array<AkashaBeamBlockRecord>;
  createdAt: Scalars['DateTime']['output'];
  embeddedBeam?: Maybe<AkashaBeamEmbeddedType>;
  id: Scalars['ID']['output'];
  mentions?: Maybe<Array<Maybe<Scalars['CeramicStreamID']['output']>>>;
  nsfw?: Maybe<Scalars['Boolean']['output']>;
  reflections: AkashaReflectConnection;
  reflectionsCount: Scalars['Int']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Current version of the document */
  version: Scalars['CeramicCommitID']['output'];
};


export type AkashaBeamReflectionsArgs = {
  account?: InputMaybe<Scalars['ID']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaReflectFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaReflectSortingInput>;
};


export type AkashaBeamReflectionsCountArgs = {
  account?: InputMaybe<Scalars['ID']['input']>;
  filters?: InputMaybe<AkashaReflectFiltersInput>;
};

export type AkashaBeamBlockRecord = {
  blockID: Scalars['CeramicStreamID']['output'];
  order: Scalars['Int']['output'];
};

export type AkashaBeamBlockRecordInput = {
  blockID: Scalars['CeramicStreamID']['input'];
  order: Scalars['Int']['input'];
};

/** A connection to a list of items. */
export type AkashaBeamConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaBeamEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaBeamEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaBeam>;
};

export type AkashaBeamEmbeddedType = {
  embeddedID: Scalars['CeramicStreamID']['output'];
  label: Scalars['String']['output'];
};

export type AkashaBeamEmbeddedTypeInput = {
  embeddedID: Scalars['CeramicStreamID']['input'];
  label: Scalars['String']['input'];
};

export type AkashaBeamFiltersInput = {
  and?: InputMaybe<Array<AkashaBeamFiltersInput>>;
  not?: InputMaybe<AkashaBeamFiltersInput>;
  or?: InputMaybe<Array<AkashaBeamFiltersInput>>;
  where?: InputMaybe<AkashaBeamObjectFilterInput>;
};

export type AkashaBeamInput = {
  active: Scalars['Boolean']['input'];
  content: Array<InputMaybe<AkashaBeamBlockRecordInput>>;
  createdAt: Scalars['DateTime']['input'];
  embeddedBeam?: InputMaybe<AkashaBeamEmbeddedTypeInput>;
  mentions?: InputMaybe<Array<InputMaybe<Scalars['CeramicStreamID']['input']>>>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AkashaBeamObjectFilterInput = {
  active?: InputMaybe<BooleanValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  nsfw?: InputMaybe<BooleanValueFilterInput>;
};

export type AkashaBeamSortingInput = {
  active?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  nsfw?: InputMaybe<SortOrder>;
};

export type AkashaBeamStream = Node & {
  active: Scalars['Boolean']['output'];
  beam?: Maybe<AkashaBeam>;
  beamID: Scalars['CeramicStreamID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  moderationID?: Maybe<Scalars['CeramicStreamID']['output']>;
  status?: Maybe<AkashaBeamStreamModerationStatus>;
};

/** A connection to a list of items. */
export type AkashaBeamStreamConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaBeamStreamEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaBeamStreamEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaBeamStream>;
};

export type AkashaBeamStreamFiltersInput = {
  and?: InputMaybe<Array<AkashaBeamStreamFiltersInput>>;
  not?: InputMaybe<AkashaBeamStreamFiltersInput>;
  or?: InputMaybe<Array<AkashaBeamStreamFiltersInput>>;
  where?: InputMaybe<AkashaBeamStreamObjectFilterInput>;
};

export type AkashaBeamStreamInput = {
  active: Scalars['Boolean']['input'];
  beamID: Scalars['CeramicStreamID']['input'];
  createdAt: Scalars['DateTime']['input'];
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  status?: InputMaybe<AkashaBeamStreamModerationStatus>;
};

export enum AkashaBeamStreamModerationStatus {
  InReview = 'IN_REVIEW',
  Nsfw = 'NSFW',
  Ok = 'OK',
  Other = 'OTHER',
  Removed = 'REMOVED',
  Suspended = 'SUSPENDED'
}

export type AkashaBeamStreamModerationStatusValueFilterInput = {
  equalTo?: InputMaybe<AkashaBeamStreamModerationStatus>;
  in?: InputMaybe<Array<AkashaBeamStreamModerationStatus>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEqualTo?: InputMaybe<AkashaBeamStreamModerationStatus>;
  notIn?: InputMaybe<Array<AkashaBeamStreamModerationStatus>>;
};

export type AkashaBeamStreamObjectFilterInput = {
  active?: InputMaybe<BooleanValueFilterInput>;
  beamID?: InputMaybe<StringValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  moderationID?: InputMaybe<StringValueFilterInput>;
  status?: InputMaybe<AkashaBeamStreamModerationStatusValueFilterInput>;
};

export type AkashaBeamStreamSortingInput = {
  active?: InputMaybe<SortOrder>;
  beamID?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  moderationID?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
};

export type AkashaBlockStorage = Node & {
  active: Scalars['Boolean']['output'];
  appVersion?: Maybe<AkashaAppRelease>;
  appVersionID: Scalars['CeramicStreamID']['output'];
  /** Account controlling the document */
  author: CeramicAccount;
  block?: Maybe<AkashaContentBlock>;
  blockID: Scalars['CeramicStreamID']['output'];
  content: Array<AkashaBlockStorageLabeledValue>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  kind?: Maybe<AkashaBlockStorageBlockStorageDef>;
  /** Current version of the document */
  version: Scalars['CeramicCommitID']['output'];
};

export enum AkashaBlockStorageBlockStorageDef {
  Bool = 'BOOL',
  Emoji = 'EMOJI',
  FormData = 'FORM_DATA',
  Other = 'OTHER',
  Text = 'TEXT'
}

export type AkashaBlockStorageBlockStorageDefValueFilterInput = {
  equalTo?: InputMaybe<AkashaBlockStorageBlockStorageDef>;
  in?: InputMaybe<Array<AkashaBlockStorageBlockStorageDef>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEqualTo?: InputMaybe<AkashaBlockStorageBlockStorageDef>;
  notIn?: InputMaybe<Array<AkashaBlockStorageBlockStorageDef>>;
};

/** A connection to a list of items. */
export type AkashaBlockStorageConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaBlockStorageEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaBlockStorageEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaBlockStorage>;
};

export type AkashaBlockStorageFiltersInput = {
  and?: InputMaybe<Array<AkashaBlockStorageFiltersInput>>;
  not?: InputMaybe<AkashaBlockStorageFiltersInput>;
  or?: InputMaybe<Array<AkashaBlockStorageFiltersInput>>;
  where?: InputMaybe<AkashaBlockStorageObjectFilterInput>;
};

export type AkashaBlockStorageInput = {
  active: Scalars['Boolean']['input'];
  appVersionID: Scalars['CeramicStreamID']['input'];
  blockID: Scalars['CeramicStreamID']['input'];
  content: Array<InputMaybe<AkashaBlockStorageLabeledValueInput>>;
  createdAt: Scalars['DateTime']['input'];
  kind?: InputMaybe<AkashaBlockStorageBlockStorageDef>;
};

export type AkashaBlockStorageLabeledValue = {
  label: Scalars['String']['output'];
  propertyType: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AkashaBlockStorageLabeledValueInput = {
  label: Scalars['String']['input'];
  propertyType: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type AkashaBlockStorageObjectFilterInput = {
  active?: InputMaybe<BooleanValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  kind?: InputMaybe<AkashaBlockStorageBlockStorageDefValueFilterInput>;
};

export type AkashaBlockStorageSortingInput = {
  active?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  kind?: InputMaybe<SortOrder>;
};

export type AkashaContentBlock = Node & {
  active: Scalars['Boolean']['output'];
  appVersion?: Maybe<AkashaAppRelease>;
  appVersionID: Scalars['CeramicStreamID']['output'];
  /** Account controlling the document */
  author: CeramicAccount;
  content: Array<AkashaContentBlockLabeledValue>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  kind?: Maybe<AkashaContentBlockBlockDef>;
  nsfw?: Maybe<Scalars['Boolean']['output']>;
  /** Current version of the document */
  version: Scalars['CeramicCommitID']['output'];
};

export enum AkashaContentBlockBlockDef {
  Form = 'FORM',
  Other = 'OTHER',
  Text = 'TEXT'
}

export type AkashaContentBlockBlockDefValueFilterInput = {
  equalTo?: InputMaybe<AkashaContentBlockBlockDef>;
  in?: InputMaybe<Array<AkashaContentBlockBlockDef>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEqualTo?: InputMaybe<AkashaContentBlockBlockDef>;
  notIn?: InputMaybe<Array<AkashaContentBlockBlockDef>>;
};

/** A connection to a list of items. */
export type AkashaContentBlockConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaContentBlockEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaContentBlockEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaContentBlock>;
};

export type AkashaContentBlockFiltersInput = {
  and?: InputMaybe<Array<AkashaContentBlockFiltersInput>>;
  not?: InputMaybe<AkashaContentBlockFiltersInput>;
  or?: InputMaybe<Array<AkashaContentBlockFiltersInput>>;
  where?: InputMaybe<AkashaContentBlockObjectFilterInput>;
};

export type AkashaContentBlockInput = {
  active: Scalars['Boolean']['input'];
  appVersionID: Scalars['CeramicStreamID']['input'];
  content: Array<InputMaybe<AkashaContentBlockLabeledValueInput>>;
  createdAt: Scalars['DateTime']['input'];
  kind?: InputMaybe<AkashaContentBlockBlockDef>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AkashaContentBlockLabeledValue = {
  label: Scalars['String']['output'];
  propertyType: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AkashaContentBlockLabeledValueInput = {
  label: Scalars['String']['input'];
  propertyType: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type AkashaContentBlockObjectFilterInput = {
  active?: InputMaybe<BooleanValueFilterInput>;
  appVersionID?: InputMaybe<StringValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  kind?: InputMaybe<AkashaContentBlockBlockDefValueFilterInput>;
  nsfw?: InputMaybe<BooleanValueFilterInput>;
};

export type AkashaContentBlockSortingInput = {
  active?: InputMaybe<SortOrder>;
  appVersionID?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  kind?: InputMaybe<SortOrder>;
  nsfw?: InputMaybe<SortOrder>;
};

export type AkashaContentBlockStream = Node & {
  active: Scalars['Boolean']['output'];
  block?: Maybe<AkashaContentBlock>;
  blockID: Scalars['CeramicStreamID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  moderationID?: Maybe<Scalars['CeramicStreamID']['output']>;
  status?: Maybe<AkashaContentBlockStreamModerationStatus>;
};

/** A connection to a list of items. */
export type AkashaContentBlockStreamConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaContentBlockStreamEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaContentBlockStreamEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaContentBlockStream>;
};

export type AkashaContentBlockStreamFiltersInput = {
  and?: InputMaybe<Array<AkashaContentBlockStreamFiltersInput>>;
  not?: InputMaybe<AkashaContentBlockStreamFiltersInput>;
  or?: InputMaybe<Array<AkashaContentBlockStreamFiltersInput>>;
  where?: InputMaybe<AkashaContentBlockStreamObjectFilterInput>;
};

export type AkashaContentBlockStreamInput = {
  active: Scalars['Boolean']['input'];
  blockID: Scalars['CeramicStreamID']['input'];
  createdAt: Scalars['DateTime']['input'];
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  status?: InputMaybe<AkashaContentBlockStreamModerationStatus>;
};

export enum AkashaContentBlockStreamModerationStatus {
  InReview = 'IN_REVIEW',
  Nsfw = 'NSFW',
  Ok = 'OK',
  Other = 'OTHER',
  Removed = 'REMOVED',
  Suspended = 'SUSPENDED'
}

export type AkashaContentBlockStreamModerationStatusValueFilterInput = {
  equalTo?: InputMaybe<AkashaContentBlockStreamModerationStatus>;
  in?: InputMaybe<Array<AkashaContentBlockStreamModerationStatus>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEqualTo?: InputMaybe<AkashaContentBlockStreamModerationStatus>;
  notIn?: InputMaybe<Array<AkashaContentBlockStreamModerationStatus>>;
};

export type AkashaContentBlockStreamObjectFilterInput = {
  active?: InputMaybe<BooleanValueFilterInput>;
  blockID?: InputMaybe<StringValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  moderationID?: InputMaybe<StringValueFilterInput>;
  status?: InputMaybe<AkashaContentBlockStreamModerationStatusValueFilterInput>;
};

export type AkashaContentBlockStreamSortingInput = {
  active?: InputMaybe<SortOrder>;
  blockID?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  moderationID?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
};

export type AkashaFollow = Node & {
  /** Account controlling the document */
  did: CeramicAccount;
  id: Scalars['ID']['output'];
  isFollowing: Scalars['Boolean']['output'];
  profile?: Maybe<AkashaProfile>;
  profileID: Scalars['CeramicStreamID']['output'];
};

/** A connection to a list of items. */
export type AkashaFollowConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaFollowEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaFollowEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaFollow>;
};

export type AkashaFollowFiltersInput = {
  and?: InputMaybe<Array<AkashaFollowFiltersInput>>;
  not?: InputMaybe<AkashaFollowFiltersInput>;
  or?: InputMaybe<Array<AkashaFollowFiltersInput>>;
  where?: InputMaybe<AkashaFollowObjectFilterInput>;
};

export type AkashaFollowInput = {
  isFollowing: Scalars['Boolean']['input'];
  profileID: Scalars['CeramicStreamID']['input'];
};

export type AkashaFollowObjectFilterInput = {
  isFollowing?: InputMaybe<BooleanValueFilterInput>;
  profileID?: InputMaybe<StringValueFilterInput>;
};

export type AkashaFollowSortingInput = {
  isFollowing?: InputMaybe<SortOrder>;
  profileID?: InputMaybe<SortOrder>;
};

export type AkashaInterestsStream = Node & {
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  labelType: Scalars['String']['output'];
  moderationID?: Maybe<Scalars['CeramicStreamID']['output']>;
  status?: Maybe<AkashaInterestsStreamModerationStatus>;
  value: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type AkashaInterestsStreamConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaInterestsStreamEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaInterestsStreamEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaInterestsStream>;
};

export type AkashaInterestsStreamFiltersInput = {
  and?: InputMaybe<Array<AkashaInterestsStreamFiltersInput>>;
  not?: InputMaybe<AkashaInterestsStreamFiltersInput>;
  or?: InputMaybe<Array<AkashaInterestsStreamFiltersInput>>;
  where?: InputMaybe<AkashaInterestsStreamObjectFilterInput>;
};

export type AkashaInterestsStreamInput = {
  active: Scalars['Boolean']['input'];
  createdAt: Scalars['DateTime']['input'];
  labelType: Scalars['String']['input'];
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  status?: InputMaybe<AkashaInterestsStreamModerationStatus>;
  value: Scalars['String']['input'];
};

export enum AkashaInterestsStreamModerationStatus {
  InReview = 'IN_REVIEW',
  Nsfw = 'NSFW',
  Ok = 'OK',
  Other = 'OTHER',
  Removed = 'REMOVED',
  Suspended = 'SUSPENDED'
}

export type AkashaInterestsStreamModerationStatusValueFilterInput = {
  equalTo?: InputMaybe<AkashaInterestsStreamModerationStatus>;
  in?: InputMaybe<Array<AkashaInterestsStreamModerationStatus>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEqualTo?: InputMaybe<AkashaInterestsStreamModerationStatus>;
  notIn?: InputMaybe<Array<AkashaInterestsStreamModerationStatus>>;
};

export type AkashaInterestsStreamObjectFilterInput = {
  active?: InputMaybe<BooleanValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  labelType?: InputMaybe<StringValueFilterInput>;
  moderationID?: InputMaybe<StringValueFilterInput>;
  status?: InputMaybe<AkashaInterestsStreamModerationStatusValueFilterInput>;
  value?: InputMaybe<StringValueFilterInput>;
};

export type AkashaInterestsStreamSortingInput = {
  active?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  labelType?: InputMaybe<SortOrder>;
  moderationID?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export type AkashaProfile = Node & {
  avatar?: Maybe<AkashaProfileImageVersions>;
  background?: Maybe<AkashaProfileImageVersions>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** Account controlling the document */
  did: CeramicAccount;
  followers: AkashaFollowConnection;
  followersCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  links?: Maybe<Array<Maybe<AkashaProfileLinkSource>>>;
  name: Scalars['String']['output'];
  nsfw?: Maybe<Scalars['Boolean']['output']>;
};


export type AkashaProfileFollowersArgs = {
  account?: InputMaybe<Scalars['ID']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaFollowFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaFollowSortingInput>;
};


export type AkashaProfileFollowersCountArgs = {
  account?: InputMaybe<Scalars['ID']['input']>;
  filters?: InputMaybe<AkashaFollowFiltersInput>;
};

/** A connection to a list of items. */
export type AkashaProfileConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaProfileEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaProfileEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaProfile>;
};

export type AkashaProfileFiltersInput = {
  and?: InputMaybe<Array<AkashaProfileFiltersInput>>;
  not?: InputMaybe<AkashaProfileFiltersInput>;
  or?: InputMaybe<Array<AkashaProfileFiltersInput>>;
  where?: InputMaybe<AkashaProfileObjectFilterInput>;
};

export type AkashaProfileImageSource = {
  height: Scalars['Int']['output'];
  src: Scalars['URI']['output'];
  width: Scalars['Int']['output'];
};

export type AkashaProfileImageSourceInput = {
  height: Scalars['Int']['input'];
  src: Scalars['URI']['input'];
  width: Scalars['Int']['input'];
};

export type AkashaProfileImageVersions = {
  alternatives?: Maybe<Array<Maybe<AkashaProfileImageSource>>>;
  default: AkashaProfileImageSource;
};

export type AkashaProfileImageVersionsInput = {
  alternatives?: InputMaybe<Array<InputMaybe<AkashaProfileImageSourceInput>>>;
  default: AkashaProfileImageSourceInput;
};

export type AkashaProfileInput = {
  avatar?: InputMaybe<AkashaProfileImageVersionsInput>;
  background?: InputMaybe<AkashaProfileImageVersionsInput>;
  createdAt: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Array<InputMaybe<AkashaProfileLinkSourceInput>>>;
  name: Scalars['String']['input'];
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AkashaProfileInterests = Node & {
  /** Account controlling the document */
  did: CeramicAccount;
  id: Scalars['ID']['output'];
  topics: Array<AkashaProfileInterestsLabeled>;
};

/** A connection to a list of items. */
export type AkashaProfileInterestsConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaProfileInterestsEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaProfileInterestsEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaProfileInterests>;
};

export type AkashaProfileInterestsInput = {
  topics: Array<InputMaybe<AkashaProfileInterestsLabeledInput>>;
};

export type AkashaProfileInterestsLabeled = {
  labelType: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AkashaProfileInterestsLabeledInput = {
  labelType: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type AkashaProfileLinkSource = {
  href: Scalars['URI']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type AkashaProfileLinkSourceInput = {
  href: Scalars['URI']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
};

export type AkashaProfileObjectFilterInput = {
  createdAt?: InputMaybe<StringValueFilterInput>;
  name?: InputMaybe<StringValueFilterInput>;
  nsfw?: InputMaybe<BooleanValueFilterInput>;
};

export type AkashaProfileSortingInput = {
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  nsfw?: InputMaybe<SortOrder>;
};

export type AkashaProfileStream = Node & {
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  moderationID?: Maybe<Scalars['CeramicStreamID']['output']>;
  profile?: Maybe<AkashaProfile>;
  profileID: Scalars['CeramicStreamID']['output'];
  status?: Maybe<AkashaProfileStreamModerationStatus>;
};

/** A connection to a list of items. */
export type AkashaProfileStreamConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaProfileStreamEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaProfileStreamEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaProfileStream>;
};

export type AkashaProfileStreamFiltersInput = {
  and?: InputMaybe<Array<AkashaProfileStreamFiltersInput>>;
  not?: InputMaybe<AkashaProfileStreamFiltersInput>;
  or?: InputMaybe<Array<AkashaProfileStreamFiltersInput>>;
  where?: InputMaybe<AkashaProfileStreamObjectFilterInput>;
};

export type AkashaProfileStreamInput = {
  active: Scalars['Boolean']['input'];
  createdAt: Scalars['DateTime']['input'];
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  profileID: Scalars['CeramicStreamID']['input'];
  status?: InputMaybe<AkashaProfileStreamModerationStatus>;
};

export enum AkashaProfileStreamModerationStatus {
  InReview = 'IN_REVIEW',
  Nsfw = 'NSFW',
  Ok = 'OK',
  Other = 'OTHER',
  Removed = 'REMOVED',
  Suspended = 'SUSPENDED'
}

export type AkashaProfileStreamModerationStatusValueFilterInput = {
  equalTo?: InputMaybe<AkashaProfileStreamModerationStatus>;
  in?: InputMaybe<Array<AkashaProfileStreamModerationStatus>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEqualTo?: InputMaybe<AkashaProfileStreamModerationStatus>;
  notIn?: InputMaybe<Array<AkashaProfileStreamModerationStatus>>;
};

export type AkashaProfileStreamObjectFilterInput = {
  active?: InputMaybe<BooleanValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  moderationID?: InputMaybe<StringValueFilterInput>;
  profileID?: InputMaybe<StringValueFilterInput>;
  status?: InputMaybe<AkashaProfileStreamModerationStatusValueFilterInput>;
};

export type AkashaProfileStreamSortingInput = {
  active?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  moderationID?: InputMaybe<SortOrder>;
  profileID?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
};

export type AkashaReflect = Node & {
  active: Scalars['Boolean']['output'];
  /** Account controlling the document */
  author: CeramicAccount;
  beam?: Maybe<AkashaBeam>;
  beamID: Scalars['CeramicStreamID']['output'];
  content: Array<AkashaReflectProviderValue>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isReply?: Maybe<Scalars['Boolean']['output']>;
  mentions?: Maybe<Array<Maybe<Scalars['CeramicStreamID']['output']>>>;
  nsfw?: Maybe<Scalars['Boolean']['output']>;
  reflection?: Maybe<Scalars['CeramicStreamID']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Current version of the document */
  version: Scalars['CeramicCommitID']['output'];
};

/** A connection to a list of items. */
export type AkashaReflectConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaReflectEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaReflectEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaReflect>;
};

export type AkashaReflectFiltersInput = {
  and?: InputMaybe<Array<AkashaReflectFiltersInput>>;
  not?: InputMaybe<AkashaReflectFiltersInput>;
  or?: InputMaybe<Array<AkashaReflectFiltersInput>>;
  where?: InputMaybe<AkashaReflectObjectFilterInput>;
};

export type AkashaReflectInput = {
  active: Scalars['Boolean']['input'];
  beamID: Scalars['CeramicStreamID']['input'];
  content: Array<InputMaybe<AkashaReflectProviderValueInput>>;
  createdAt: Scalars['DateTime']['input'];
  isReply?: InputMaybe<Scalars['Boolean']['input']>;
  mentions?: InputMaybe<Array<InputMaybe<Scalars['CeramicStreamID']['input']>>>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  reflection?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AkashaReflectObjectFilterInput = {
  active?: InputMaybe<BooleanValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  isReply?: InputMaybe<BooleanValueFilterInput>;
  nsfw?: InputMaybe<BooleanValueFilterInput>;
  reflection?: InputMaybe<StringValueFilterInput>;
};

export type AkashaReflectProviderValue = {
  label: Scalars['String']['output'];
  propertyType: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AkashaReflectProviderValueInput = {
  label: Scalars['String']['input'];
  propertyType: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type AkashaReflectSortingInput = {
  active?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  isReply?: InputMaybe<SortOrder>;
  nsfw?: InputMaybe<SortOrder>;
  reflection?: InputMaybe<SortOrder>;
};

export type AkashaReflectStream = Node & {
  active: Scalars['Boolean']['output'];
  beamID: Scalars['CeramicStreamID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  moderationID?: Maybe<Scalars['CeramicStreamID']['output']>;
  reflection?: Maybe<AkashaReflect>;
  reflectionID: Scalars['CeramicStreamID']['output'];
  status?: Maybe<AkashaReflectStreamModerationStatus>;
};

/** A connection to a list of items. */
export type AkashaReflectStreamConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AkashaReflectStreamEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AkashaReflectStreamEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AkashaReflectStream>;
};

export type AkashaReflectStreamFiltersInput = {
  and?: InputMaybe<Array<AkashaReflectStreamFiltersInput>>;
  not?: InputMaybe<AkashaReflectStreamFiltersInput>;
  or?: InputMaybe<Array<AkashaReflectStreamFiltersInput>>;
  where?: InputMaybe<AkashaReflectStreamObjectFilterInput>;
};

export type AkashaReflectStreamInput = {
  active: Scalars['Boolean']['input'];
  beamID: Scalars['CeramicStreamID']['input'];
  createdAt: Scalars['DateTime']['input'];
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  reflectionID: Scalars['CeramicStreamID']['input'];
  status?: InputMaybe<AkashaReflectStreamModerationStatus>;
};

export enum AkashaReflectStreamModerationStatus {
  InReview = 'IN_REVIEW',
  Nsfw = 'NSFW',
  Ok = 'OK',
  Other = 'OTHER',
  Removed = 'REMOVED',
  Suspended = 'SUSPENDED'
}

export type AkashaReflectStreamModerationStatusValueFilterInput = {
  equalTo?: InputMaybe<AkashaReflectStreamModerationStatus>;
  in?: InputMaybe<Array<AkashaReflectStreamModerationStatus>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEqualTo?: InputMaybe<AkashaReflectStreamModerationStatus>;
  notIn?: InputMaybe<Array<AkashaReflectStreamModerationStatus>>;
};

export type AkashaReflectStreamObjectFilterInput = {
  active?: InputMaybe<BooleanValueFilterInput>;
  beamID?: InputMaybe<StringValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
  moderationID?: InputMaybe<StringValueFilterInput>;
  reflectionID?: InputMaybe<StringValueFilterInput>;
  status?: InputMaybe<AkashaReflectStreamModerationStatusValueFilterInput>;
};

export type AkashaReflectStreamSortingInput = {
  active?: InputMaybe<SortOrder>;
  beamID?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  moderationID?: InputMaybe<SortOrder>;
  reflectionID?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
};

export type BooleanValueFilterInput = {
  equalTo?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CeramicAccount = Node & {
  akashaAppList?: Maybe<AkashaAppConnection>;
  akashaAppListCount: Scalars['Int']['output'];
  akashaAppReleaseList?: Maybe<AkashaAppReleaseConnection>;
  akashaAppReleaseListCount: Scalars['Int']['output'];
  akashaAppsStreamList?: Maybe<AkashaAppsStreamConnection>;
  akashaAppsStreamListCount: Scalars['Int']['output'];
  akashaBeamList?: Maybe<AkashaBeamConnection>;
  akashaBeamListCount: Scalars['Int']['output'];
  akashaBeamStreamList?: Maybe<AkashaBeamStreamConnection>;
  akashaBeamStreamListCount: Scalars['Int']['output'];
  akashaBlockStorageList?: Maybe<AkashaBlockStorageConnection>;
  akashaBlockStorageListCount: Scalars['Int']['output'];
  akashaContentBlockList?: Maybe<AkashaContentBlockConnection>;
  akashaContentBlockListCount: Scalars['Int']['output'];
  akashaContentBlockStreamList?: Maybe<AkashaContentBlockStreamConnection>;
  akashaContentBlockStreamListCount: Scalars['Int']['output'];
  akashaFollowList?: Maybe<AkashaFollowConnection>;
  akashaFollowListCount: Scalars['Int']['output'];
  akashaInterestsStreamList?: Maybe<AkashaInterestsStreamConnection>;
  akashaInterestsStreamListCount: Scalars['Int']['output'];
  akashaProfile?: Maybe<AkashaProfile>;
  akashaProfileInterests?: Maybe<AkashaProfileInterests>;
  akashaProfileStreamList?: Maybe<AkashaProfileStreamConnection>;
  akashaProfileStreamListCount: Scalars['Int']['output'];
  akashaReflectList?: Maybe<AkashaReflectConnection>;
  akashaReflectListCount: Scalars['Int']['output'];
  akashaReflectStreamList?: Maybe<AkashaReflectStreamConnection>;
  akashaReflectStreamListCount: Scalars['Int']['output'];
  /** Globally unique identifier of the account (DID string) */
  id: Scalars['ID']['output'];
  /** Whether the Ceramic instance is currently authenticated with this account or not */
  isViewer: Scalars['Boolean']['output'];
};


export type CeramicAccountAkashaAppListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaAppFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaAppSortingInput>;
};


export type CeramicAccountAkashaAppListCountArgs = {
  filters?: InputMaybe<AkashaAppFiltersInput>;
};


export type CeramicAccountAkashaAppReleaseListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaAppReleaseFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaAppReleaseSortingInput>;
};


export type CeramicAccountAkashaAppReleaseListCountArgs = {
  filters?: InputMaybe<AkashaAppReleaseFiltersInput>;
};


export type CeramicAccountAkashaAppsStreamListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaAppsStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaAppsStreamSortingInput>;
};


export type CeramicAccountAkashaAppsStreamListCountArgs = {
  filters?: InputMaybe<AkashaAppsStreamFiltersInput>;
};


export type CeramicAccountAkashaBeamListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaBeamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaBeamSortingInput>;
};


export type CeramicAccountAkashaBeamListCountArgs = {
  filters?: InputMaybe<AkashaBeamFiltersInput>;
};


export type CeramicAccountAkashaBeamStreamListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaBeamStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaBeamStreamSortingInput>;
};


export type CeramicAccountAkashaBeamStreamListCountArgs = {
  filters?: InputMaybe<AkashaBeamStreamFiltersInput>;
};


export type CeramicAccountAkashaBlockStorageListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaBlockStorageFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaBlockStorageSortingInput>;
};


export type CeramicAccountAkashaBlockStorageListCountArgs = {
  filters?: InputMaybe<AkashaBlockStorageFiltersInput>;
};


export type CeramicAccountAkashaContentBlockListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaContentBlockFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaContentBlockSortingInput>;
};


export type CeramicAccountAkashaContentBlockListCountArgs = {
  filters?: InputMaybe<AkashaContentBlockFiltersInput>;
};


export type CeramicAccountAkashaContentBlockStreamListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaContentBlockStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaContentBlockStreamSortingInput>;
};


export type CeramicAccountAkashaContentBlockStreamListCountArgs = {
  filters?: InputMaybe<AkashaContentBlockStreamFiltersInput>;
};


export type CeramicAccountAkashaFollowListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaFollowFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaFollowSortingInput>;
};


export type CeramicAccountAkashaFollowListCountArgs = {
  filters?: InputMaybe<AkashaFollowFiltersInput>;
};


export type CeramicAccountAkashaInterestsStreamListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaInterestsStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaInterestsStreamSortingInput>;
};


export type CeramicAccountAkashaInterestsStreamListCountArgs = {
  filters?: InputMaybe<AkashaInterestsStreamFiltersInput>;
};


export type CeramicAccountAkashaProfileStreamListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaProfileStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaProfileStreamSortingInput>;
};


export type CeramicAccountAkashaProfileStreamListCountArgs = {
  filters?: InputMaybe<AkashaProfileStreamFiltersInput>;
};


export type CeramicAccountAkashaReflectListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaReflectFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaReflectSortingInput>;
};


export type CeramicAccountAkashaReflectListCountArgs = {
  filters?: InputMaybe<AkashaReflectFiltersInput>;
};


export type CeramicAccountAkashaReflectStreamListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaReflectStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaReflectStreamSortingInput>;
};


export type CeramicAccountAkashaReflectStreamListCountArgs = {
  filters?: InputMaybe<AkashaReflectStreamFiltersInput>;
};

export type CreateAkashaAppInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaAppInput;
};

export type CreateAkashaAppPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaApp;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaAppPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaAppReleaseInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaAppReleaseInput;
};

export type CreateAkashaAppReleasePayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaAppRelease;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaAppReleasePayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaAppsStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaAppsStreamInput;
};

export type CreateAkashaAppsStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaAppsStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaAppsStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaBeamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaBeamInput;
};

export type CreateAkashaBeamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaBeam;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaBeamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaBeamStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaBeamStreamInput;
};

export type CreateAkashaBeamStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaBeamStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaBeamStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaBlockStorageInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaBlockStorageInput;
};

export type CreateAkashaBlockStoragePayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaBlockStorage;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaBlockStoragePayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaContentBlockInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaContentBlockInput;
};

export type CreateAkashaContentBlockPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaContentBlock;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaContentBlockPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaContentBlockStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaContentBlockStreamInput;
};

export type CreateAkashaContentBlockStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaContentBlockStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaContentBlockStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaFollowInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaFollowInput;
};

export type CreateAkashaFollowPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaFollow;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaFollowPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaInterestsStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaInterestsStreamInput;
};

export type CreateAkashaInterestsStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaInterestsStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaInterestsStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaProfileInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaProfileInput;
  options?: InputMaybe<SetOptionsInput>;
};

export type CreateAkashaProfileInterestsInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaProfileInterestsInput;
  options?: InputMaybe<SetOptionsInput>;
};

export type CreateAkashaProfileInterestsPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaProfileInterests;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaProfileInterestsPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaProfilePayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaProfile;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaProfilePayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaProfileStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaProfileStreamInput;
};

export type CreateAkashaProfileStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaProfileStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaProfileStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaReflectInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaReflectInput;
};

export type CreateAkashaReflectPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaReflect;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaReflectPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type CreateAkashaReflectStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: AkashaReflectStreamInput;
};

export type CreateAkashaReflectStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaReflectStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateAkashaReflectStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  createAkashaApp?: Maybe<CreateAkashaAppPayload>;
  createAkashaAppRelease?: Maybe<CreateAkashaAppReleasePayload>;
  createAkashaAppsStream?: Maybe<CreateAkashaAppsStreamPayload>;
  createAkashaBeam?: Maybe<CreateAkashaBeamPayload>;
  createAkashaBeamStream?: Maybe<CreateAkashaBeamStreamPayload>;
  createAkashaBlockStorage?: Maybe<CreateAkashaBlockStoragePayload>;
  createAkashaContentBlock?: Maybe<CreateAkashaContentBlockPayload>;
  createAkashaContentBlockStream?: Maybe<CreateAkashaContentBlockStreamPayload>;
  createAkashaFollow?: Maybe<CreateAkashaFollowPayload>;
  createAkashaInterestsStream?: Maybe<CreateAkashaInterestsStreamPayload>;
  createAkashaProfile?: Maybe<CreateAkashaProfilePayload>;
  createAkashaProfileInterests?: Maybe<CreateAkashaProfileInterestsPayload>;
  createAkashaProfileStream?: Maybe<CreateAkashaProfileStreamPayload>;
  createAkashaReflect?: Maybe<CreateAkashaReflectPayload>;
  createAkashaReflectStream?: Maybe<CreateAkashaReflectStreamPayload>;
  updateAkashaApp?: Maybe<UpdateAkashaAppPayload>;
  updateAkashaAppRelease?: Maybe<UpdateAkashaAppReleasePayload>;
  updateAkashaAppsStream?: Maybe<UpdateAkashaAppsStreamPayload>;
  updateAkashaBeam?: Maybe<UpdateAkashaBeamPayload>;
  updateAkashaBeamStream?: Maybe<UpdateAkashaBeamStreamPayload>;
  updateAkashaBlockStorage?: Maybe<UpdateAkashaBlockStoragePayload>;
  updateAkashaContentBlock?: Maybe<UpdateAkashaContentBlockPayload>;
  updateAkashaContentBlockStream?: Maybe<UpdateAkashaContentBlockStreamPayload>;
  updateAkashaFollow?: Maybe<UpdateAkashaFollowPayload>;
  updateAkashaInterestsStream?: Maybe<UpdateAkashaInterestsStreamPayload>;
  updateAkashaProfile?: Maybe<UpdateAkashaProfilePayload>;
  updateAkashaProfileInterests?: Maybe<UpdateAkashaProfileInterestsPayload>;
  updateAkashaProfileStream?: Maybe<UpdateAkashaProfileStreamPayload>;
  updateAkashaReflect?: Maybe<UpdateAkashaReflectPayload>;
  updateAkashaReflectStream?: Maybe<UpdateAkashaReflectStreamPayload>;
};


export type MutationCreateAkashaAppArgs = {
  input: CreateAkashaAppInput;
};


export type MutationCreateAkashaAppReleaseArgs = {
  input: CreateAkashaAppReleaseInput;
};


export type MutationCreateAkashaAppsStreamArgs = {
  input: CreateAkashaAppsStreamInput;
};


export type MutationCreateAkashaBeamArgs = {
  input: CreateAkashaBeamInput;
};


export type MutationCreateAkashaBeamStreamArgs = {
  input: CreateAkashaBeamStreamInput;
};


export type MutationCreateAkashaBlockStorageArgs = {
  input: CreateAkashaBlockStorageInput;
};


export type MutationCreateAkashaContentBlockArgs = {
  input: CreateAkashaContentBlockInput;
};


export type MutationCreateAkashaContentBlockStreamArgs = {
  input: CreateAkashaContentBlockStreamInput;
};


export type MutationCreateAkashaFollowArgs = {
  input: CreateAkashaFollowInput;
};


export type MutationCreateAkashaInterestsStreamArgs = {
  input: CreateAkashaInterestsStreamInput;
};


export type MutationCreateAkashaProfileArgs = {
  input: CreateAkashaProfileInput;
};


export type MutationCreateAkashaProfileInterestsArgs = {
  input: CreateAkashaProfileInterestsInput;
};


export type MutationCreateAkashaProfileStreamArgs = {
  input: CreateAkashaProfileStreamInput;
};


export type MutationCreateAkashaReflectArgs = {
  input: CreateAkashaReflectInput;
};


export type MutationCreateAkashaReflectStreamArgs = {
  input: CreateAkashaReflectStreamInput;
};


export type MutationUpdateAkashaAppArgs = {
  input: UpdateAkashaAppInput;
};


export type MutationUpdateAkashaAppReleaseArgs = {
  input: UpdateAkashaAppReleaseInput;
};


export type MutationUpdateAkashaAppsStreamArgs = {
  input: UpdateAkashaAppsStreamInput;
};


export type MutationUpdateAkashaBeamArgs = {
  input: UpdateAkashaBeamInput;
};


export type MutationUpdateAkashaBeamStreamArgs = {
  input: UpdateAkashaBeamStreamInput;
};


export type MutationUpdateAkashaBlockStorageArgs = {
  input: UpdateAkashaBlockStorageInput;
};


export type MutationUpdateAkashaContentBlockArgs = {
  input: UpdateAkashaContentBlockInput;
};


export type MutationUpdateAkashaContentBlockStreamArgs = {
  input: UpdateAkashaContentBlockStreamInput;
};


export type MutationUpdateAkashaFollowArgs = {
  input: UpdateAkashaFollowInput;
};


export type MutationUpdateAkashaInterestsStreamArgs = {
  input: UpdateAkashaInterestsStreamInput;
};


export type MutationUpdateAkashaProfileArgs = {
  input: UpdateAkashaProfileInput;
};


export type MutationUpdateAkashaProfileInterestsArgs = {
  input: UpdateAkashaProfileInterestsInput;
};


export type MutationUpdateAkashaProfileStreamArgs = {
  input: UpdateAkashaProfileStreamInput;
};


export type MutationUpdateAkashaReflectArgs = {
  input: UpdateAkashaReflectInput;
};


export type MutationUpdateAkashaReflectStreamArgs = {
  input: UpdateAkashaReflectStreamInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PartialAkashaAppInput = {
  applicationType?: InputMaybe<AkashaAppApplicationType>;
  contributors?: InputMaybe<Array<InputMaybe<Scalars['DID']['input']>>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  licence?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type PartialAkashaAppReleaseInput = {
  applicationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  source?: InputMaybe<Scalars['InterPlanetaryCID']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type PartialAkashaAppsStreamInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  applicationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  status?: InputMaybe<AkashaAppsStreamModerationStatus>;
};

export type PartialAkashaBeamInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  content?: InputMaybe<Array<InputMaybe<AkashaBeamBlockRecordInput>>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  embeddedBeam?: InputMaybe<AkashaBeamEmbeddedTypeInput>;
  mentions?: InputMaybe<Array<InputMaybe<Scalars['CeramicStreamID']['input']>>>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PartialAkashaBeamStreamInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  beamID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  status?: InputMaybe<AkashaBeamStreamModerationStatus>;
};

export type PartialAkashaBlockStorageInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  appVersionID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  blockID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  content?: InputMaybe<Array<InputMaybe<AkashaBlockStorageLabeledValueInput>>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  kind?: InputMaybe<AkashaBlockStorageBlockStorageDef>;
};

export type PartialAkashaContentBlockInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  appVersionID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  content?: InputMaybe<Array<InputMaybe<AkashaContentBlockLabeledValueInput>>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  kind?: InputMaybe<AkashaContentBlockBlockDef>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PartialAkashaContentBlockStreamInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  blockID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  status?: InputMaybe<AkashaContentBlockStreamModerationStatus>;
};

export type PartialAkashaFollowInput = {
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>;
  profileID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
};

export type PartialAkashaInterestsStreamInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  labelType?: InputMaybe<Scalars['String']['input']>;
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  status?: InputMaybe<AkashaInterestsStreamModerationStatus>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type PartialAkashaProfileInput = {
  avatar?: InputMaybe<AkashaProfileImageVersionsInput>;
  background?: InputMaybe<AkashaProfileImageVersionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Array<InputMaybe<AkashaProfileLinkSourceInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PartialAkashaProfileInterestsInput = {
  topics?: InputMaybe<Array<InputMaybe<AkashaProfileInterestsLabeledInput>>>;
};

export type PartialAkashaProfileStreamInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  profileID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  status?: InputMaybe<AkashaProfileStreamModerationStatus>;
};

export type PartialAkashaReflectInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  beamID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  content?: InputMaybe<Array<InputMaybe<AkashaReflectProviderValueInput>>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  isReply?: InputMaybe<Scalars['Boolean']['input']>;
  mentions?: InputMaybe<Array<InputMaybe<Scalars['CeramicStreamID']['input']>>>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  reflection?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PartialAkashaReflectStreamInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  beamID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  moderationID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  reflectionID?: InputMaybe<Scalars['CeramicStreamID']['input']>;
  status?: InputMaybe<AkashaReflectStreamModerationStatus>;
};

export type Query = {
  akashaAppCount: Scalars['Int']['output'];
  akashaAppIndex?: Maybe<AkashaAppConnection>;
  akashaAppReleaseCount: Scalars['Int']['output'];
  akashaAppReleaseIndex?: Maybe<AkashaAppReleaseConnection>;
  akashaAppsStreamCount: Scalars['Int']['output'];
  akashaAppsStreamIndex?: Maybe<AkashaAppsStreamConnection>;
  akashaBeamCount: Scalars['Int']['output'];
  akashaBeamIndex?: Maybe<AkashaBeamConnection>;
  akashaBeamStreamCount: Scalars['Int']['output'];
  akashaBeamStreamIndex?: Maybe<AkashaBeamStreamConnection>;
  akashaBlockStorageCount: Scalars['Int']['output'];
  akashaBlockStorageIndex?: Maybe<AkashaBlockStorageConnection>;
  akashaContentBlockCount: Scalars['Int']['output'];
  akashaContentBlockIndex?: Maybe<AkashaContentBlockConnection>;
  akashaContentBlockStreamCount: Scalars['Int']['output'];
  akashaContentBlockStreamIndex?: Maybe<AkashaContentBlockStreamConnection>;
  akashaFollowCount: Scalars['Int']['output'];
  akashaFollowIndex?: Maybe<AkashaFollowConnection>;
  akashaInterestsStreamCount: Scalars['Int']['output'];
  akashaInterestsStreamIndex?: Maybe<AkashaInterestsStreamConnection>;
  akashaProfileCount: Scalars['Int']['output'];
  akashaProfileIndex?: Maybe<AkashaProfileConnection>;
  akashaProfileInterestsCount: Scalars['Int']['output'];
  akashaProfileInterestsIndex?: Maybe<AkashaProfileInterestsConnection>;
  akashaProfileStreamCount: Scalars['Int']['output'];
  akashaProfileStreamIndex?: Maybe<AkashaProfileStreamConnection>;
  akashaReflectCount: Scalars['Int']['output'];
  akashaReflectIndex?: Maybe<AkashaReflectConnection>;
  akashaReflectStreamCount: Scalars['Int']['output'];
  akashaReflectStreamIndex?: Maybe<AkashaReflectStreamConnection>;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Fetches objects given their IDs */
  nodes: Array<Maybe<Node>>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type QueryAkashaAppCountArgs = {
  filters?: InputMaybe<AkashaAppFiltersInput>;
};


export type QueryAkashaAppIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaAppFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaAppSortingInput>;
};


export type QueryAkashaAppReleaseCountArgs = {
  filters?: InputMaybe<AkashaAppReleaseFiltersInput>;
};


export type QueryAkashaAppReleaseIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaAppReleaseFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaAppReleaseSortingInput>;
};


export type QueryAkashaAppsStreamCountArgs = {
  filters?: InputMaybe<AkashaAppsStreamFiltersInput>;
};


export type QueryAkashaAppsStreamIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaAppsStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaAppsStreamSortingInput>;
};


export type QueryAkashaBeamCountArgs = {
  filters?: InputMaybe<AkashaBeamFiltersInput>;
};


export type QueryAkashaBeamIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaBeamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaBeamSortingInput>;
};


export type QueryAkashaBeamStreamCountArgs = {
  filters?: InputMaybe<AkashaBeamStreamFiltersInput>;
};


export type QueryAkashaBeamStreamIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaBeamStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaBeamStreamSortingInput>;
};


export type QueryAkashaBlockStorageCountArgs = {
  filters?: InputMaybe<AkashaBlockStorageFiltersInput>;
};


export type QueryAkashaBlockStorageIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaBlockStorageFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaBlockStorageSortingInput>;
};


export type QueryAkashaContentBlockCountArgs = {
  filters?: InputMaybe<AkashaContentBlockFiltersInput>;
};


export type QueryAkashaContentBlockIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaContentBlockFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaContentBlockSortingInput>;
};


export type QueryAkashaContentBlockStreamCountArgs = {
  filters?: InputMaybe<AkashaContentBlockStreamFiltersInput>;
};


export type QueryAkashaContentBlockStreamIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaContentBlockStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaContentBlockStreamSortingInput>;
};


export type QueryAkashaFollowCountArgs = {
  filters?: InputMaybe<AkashaFollowFiltersInput>;
};


export type QueryAkashaFollowIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaFollowFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaFollowSortingInput>;
};


export type QueryAkashaInterestsStreamCountArgs = {
  filters?: InputMaybe<AkashaInterestsStreamFiltersInput>;
};


export type QueryAkashaInterestsStreamIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaInterestsStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaInterestsStreamSortingInput>;
};


export type QueryAkashaProfileCountArgs = {
  filters?: InputMaybe<AkashaProfileFiltersInput>;
};


export type QueryAkashaProfileIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaProfileFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaProfileSortingInput>;
};


export type QueryAkashaProfileInterestsIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAkashaProfileStreamCountArgs = {
  filters?: InputMaybe<AkashaProfileStreamFiltersInput>;
};


export type QueryAkashaProfileStreamIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaProfileStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaProfileStreamSortingInput>;
};


export type QueryAkashaReflectCountArgs = {
  filters?: InputMaybe<AkashaReflectFiltersInput>;
};


export type QueryAkashaReflectIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaReflectFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaReflectSortingInput>;
};


export type QueryAkashaReflectStreamCountArgs = {
  filters?: InputMaybe<AkashaReflectStreamFiltersInput>;
};


export type QueryAkashaReflectStreamIndexArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<AkashaReflectStreamFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AkashaReflectStreamSortingInput>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type SetOptionsInput = {
  /** Maximum amount of time to lookup the stream over the network, in seconds - see https://developers.ceramic.network/reference/typescript/interfaces/_ceramicnetwork_common.CreateOpts.html#syncTimeoutSeconds */
  syncTimeout?: InputMaybe<Scalars['Int']['input']>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringValueFilterInput = {
  equalTo?: InputMaybe<Scalars['String']['input']>;
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['String']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateAkashaAppInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaAppInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaAppPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaApp;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaAppPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaAppReleaseInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaAppReleaseInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaAppReleasePayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaAppRelease;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaAppReleasePayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaAppsStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaAppsStreamInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaAppsStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaAppsStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaAppsStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaBeamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaBeamInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaBeamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaBeam;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaBeamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaBeamStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaBeamStreamInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaBeamStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaBeamStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaBeamStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaBlockStorageInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaBlockStorageInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaBlockStoragePayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaBlockStorage;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaBlockStoragePayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaContentBlockInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaContentBlockInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaContentBlockPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaContentBlock;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaContentBlockPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaContentBlockStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaContentBlockStreamInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaContentBlockStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaContentBlockStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaContentBlockStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaFollowInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaFollowInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaFollowPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaFollow;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaFollowPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaInterestsStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaInterestsStreamInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaInterestsStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaInterestsStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaInterestsStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaProfileInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaProfileInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaProfileInterestsInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaProfileInterestsInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaProfileInterestsPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaProfileInterests;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaProfileInterestsPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaProfilePayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaProfile;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaProfilePayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaProfileStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaProfileStreamInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaProfileStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaProfileStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaProfileStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaReflectInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaReflectInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaReflectPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaReflect;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaReflectPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateAkashaReflectStreamInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: PartialAkashaReflectStreamInput;
  id: Scalars['ID']['input'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateAkashaReflectStreamPayload = {
  clientMutationId?: Maybe<Scalars['String']['output']>;
  document: AkashaReflectStream;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateAkashaReflectStreamPayloadNodeArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateOptionsInput = {
  /** Fully replace the document contents instead of performing a shallow merge */
  replace?: InputMaybe<Scalars['Boolean']['input']>;
  /** Only perform mutation if the document matches the provided version */
  version?: InputMaybe<Scalars['CeramicCommitID']['input']>;
};

export type AkashaProfileStreamFragment = { id: string, profileID: any, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaProfileStreamModerationStatus | null };

export type AkashaBeamStreamFragment = { id: string, beamID: any, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaBeamStreamModerationStatus | null };

export type AkashaContentBlockStreamFragment = { id: string, active: boolean, createdAt: any, moderationID?: any | null, blockID: any, status?: AkashaContentBlockStreamModerationStatus | null };

export type AkashaReflectStreamFragment = { id: string, beamID: any, active: boolean, createdAt: any, moderationID?: any | null, reflectionID: any, status?: AkashaReflectStreamModerationStatus | null };

export type AkashaInterestsStreamFragment = { id: string, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaInterestsStreamModerationStatus | null, labelType: string, value: string };

export type AkashaAppsStreamFragment = { id: string, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaAppsStreamModerationStatus | null, applicationID: any };

export type IndexProfileStreamMutationVariables = Exact<{
  i: CreateAkashaProfileStreamInput;
}>;


export type IndexProfileStreamMutation = { createAkashaProfileStream?: { clientMutationId?: string | null, document: { id: string, profileID: any, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaProfileStreamModerationStatus | null } } | null };

export type UpdateProfileStreamMutationVariables = Exact<{
  i: UpdateAkashaProfileStreamInput;
}>;


export type UpdateProfileStreamMutation = { updateAkashaProfileStream?: { clientMutationId?: string | null, document: { id: string, profileID: any, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaProfileStreamModerationStatus | null } } | null };

export type IndexBeamStreamMutationVariables = Exact<{
  i: CreateAkashaBeamStreamInput;
}>;


export type IndexBeamStreamMutation = { createAkashaBeamStream?: { clientMutationId?: string | null, document: { id: string, beamID: any, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaBeamStreamModerationStatus | null } } | null };

export type UpdateBeamStreamMutationVariables = Exact<{
  i: UpdateAkashaBeamStreamInput;
}>;


export type UpdateBeamStreamMutation = { updateAkashaBeamStream?: { clientMutationId?: string | null, document: { id: string, beamID: any, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaBeamStreamModerationStatus | null } } | null };

export type IndexContentBlockStreamMutationVariables = Exact<{
  i: CreateAkashaContentBlockStreamInput;
}>;


export type IndexContentBlockStreamMutation = { createAkashaContentBlockStream?: { clientMutationId?: string | null, document: { id: string, active: boolean, createdAt: any, moderationID?: any | null, blockID: any, status?: AkashaContentBlockStreamModerationStatus | null } } | null };

export type UpdateContentBlockStreamMutationVariables = Exact<{
  i: UpdateAkashaContentBlockStreamInput;
}>;


export type UpdateContentBlockStreamMutation = { updateAkashaContentBlockStream?: { clientMutationId?: string | null, document: { id: string, active: boolean, createdAt: any, moderationID?: any | null, blockID: any, status?: AkashaContentBlockStreamModerationStatus | null } } | null };

export type IndexAkashaReflectStreamMutationVariables = Exact<{
  i: CreateAkashaReflectStreamInput;
}>;


export type IndexAkashaReflectStreamMutation = { createAkashaReflectStream?: { clientMutationId?: string | null, document: { id: string, beamID: any, active: boolean, createdAt: any, moderationID?: any | null, reflectionID: any, status?: AkashaReflectStreamModerationStatus | null } } | null };

export type UpdateAkashaReflectStreamMutationVariables = Exact<{
  i: UpdateAkashaReflectStreamInput;
}>;


export type UpdateAkashaReflectStreamMutation = { updateAkashaReflectStream?: { clientMutationId?: string | null, document: { id: string, beamID: any, active: boolean, createdAt: any, moderationID?: any | null, reflectionID: any, status?: AkashaReflectStreamModerationStatus | null } } | null };

export type IndexAkashaInterestsStreamMutationVariables = Exact<{
  i: CreateAkashaInterestsStreamInput;
}>;


export type IndexAkashaInterestsStreamMutation = { createAkashaInterestsStream?: { clientMutationId?: string | null, document: { id: string, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaInterestsStreamModerationStatus | null, labelType: string, value: string } } | null };

export type UpdateAkashaInterestsStreamMutationVariables = Exact<{
  i: UpdateAkashaInterestsStreamInput;
}>;


export type UpdateAkashaInterestsStreamMutation = { updateAkashaInterestsStream?: { clientMutationId?: string | null, document: { id: string, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaInterestsStreamModerationStatus | null, labelType: string, value: string } } | null };

export type IndexAkashaAppsStreamMutationVariables = Exact<{
  i: CreateAkashaAppsStreamInput;
}>;


export type IndexAkashaAppsStreamMutation = { createAkashaAppsStream?: { clientMutationId?: string | null, document: { id: string, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaAppsStreamModerationStatus | null, applicationID: any } } | null };

export type UpdateAkashaAppsStreamMutationVariables = Exact<{
  i: UpdateAkashaAppsStreamInput;
}>;


export type UpdateAkashaAppsStreamMutation = { updateAkashaAppsStream?: { clientMutationId?: string | null, document: { id: string, active: boolean, createdAt: any, moderationID?: any | null, status?: AkashaAppsStreamModerationStatus | null, applicationID: any } } | null };

export type GetReflectionByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetReflectionByIdQuery = { node?: { id: string, beamID: any, nsfw?: boolean | null, createdAt: any, active: boolean } | {} | null };

export const AkashaProfileStreamFragmentDoc = /*#__PURE__*/ gql`
    fragment AkashaProfileStreamFragment on AkashaProfileStream {
  id
  profileID
  active
  createdAt
  moderationID
  status
}
    `;
export const AkashaBeamStreamFragmentDoc = /*#__PURE__*/ gql`
    fragment AkashaBeamStreamFragment on AkashaBeamStream {
  id
  beamID
  active
  createdAt
  moderationID
  status
}
    `;
export const AkashaContentBlockStreamFragmentDoc = /*#__PURE__*/ gql`
    fragment AkashaContentBlockStreamFragment on AkashaContentBlockStream {
  id
  active
  createdAt
  moderationID
  blockID
  status
}
    `;
export const AkashaReflectStreamFragmentDoc = /*#__PURE__*/ gql`
    fragment AkashaReflectStreamFragment on AkashaReflectStream {
  id
  beamID
  active
  createdAt
  moderationID
  reflectionID
  status
}
    `;
export const AkashaInterestsStreamFragmentDoc = /*#__PURE__*/ gql`
    fragment AkashaInterestsStreamFragment on AkashaInterestsStream {
  id
  active
  createdAt
  moderationID
  status
  labelType
  value
}
    `;
export const AkashaAppsStreamFragmentDoc = /*#__PURE__*/ gql`
    fragment AkashaAppsStreamFragment on AkashaAppsStream {
  id
  active
  createdAt
  moderationID
  status
  applicationID
}
    `;
export const IndexProfileStreamDocument = /*#__PURE__*/ gql`
    mutation IndexProfileStream($i: CreateAkashaProfileStreamInput!) {
  createAkashaProfileStream(input: $i) {
    document {
      ...AkashaProfileStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaProfileStreamFragmentDoc}`;
export const UpdateProfileStreamDocument = /*#__PURE__*/ gql`
    mutation UpdateProfileStream($i: UpdateAkashaProfileStreamInput!) {
  updateAkashaProfileStream(input: $i) {
    document {
      ...AkashaProfileStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaProfileStreamFragmentDoc}`;
export const IndexBeamStreamDocument = /*#__PURE__*/ gql`
    mutation IndexBeamStream($i: CreateAkashaBeamStreamInput!) {
  createAkashaBeamStream(input: $i) {
    document {
      ...AkashaBeamStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaBeamStreamFragmentDoc}`;
export const UpdateBeamStreamDocument = /*#__PURE__*/ gql`
    mutation UpdateBeamStream($i: UpdateAkashaBeamStreamInput!) {
  updateAkashaBeamStream(input: $i) {
    document {
      ...AkashaBeamStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaBeamStreamFragmentDoc}`;
export const IndexContentBlockStreamDocument = /*#__PURE__*/ gql`
    mutation IndexContentBlockStream($i: CreateAkashaContentBlockStreamInput!) {
  createAkashaContentBlockStream(input: $i) {
    document {
      ...AkashaContentBlockStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaContentBlockStreamFragmentDoc}`;
export const UpdateContentBlockStreamDocument = /*#__PURE__*/ gql`
    mutation UpdateContentBlockStream($i: UpdateAkashaContentBlockStreamInput!) {
  updateAkashaContentBlockStream(input: $i) {
    document {
      ...AkashaContentBlockStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaContentBlockStreamFragmentDoc}`;
export const IndexAkashaReflectStreamDocument = /*#__PURE__*/ gql`
    mutation IndexAkashaReflectStream($i: CreateAkashaReflectStreamInput!) {
  createAkashaReflectStream(input: $i) {
    document {
      ...AkashaReflectStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaReflectStreamFragmentDoc}`;
export const UpdateAkashaReflectStreamDocument = /*#__PURE__*/ gql`
    mutation UpdateAkashaReflectStream($i: UpdateAkashaReflectStreamInput!) {
  updateAkashaReflectStream(input: $i) {
    document {
      ...AkashaReflectStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaReflectStreamFragmentDoc}`;
export const IndexAkashaInterestsStreamDocument = /*#__PURE__*/ gql`
    mutation IndexAkashaInterestsStream($i: CreateAkashaInterestsStreamInput!) {
  createAkashaInterestsStream(input: $i) {
    document {
      ...AkashaInterestsStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaInterestsStreamFragmentDoc}`;
export const UpdateAkashaInterestsStreamDocument = /*#__PURE__*/ gql`
    mutation UpdateAkashaInterestsStream($i: UpdateAkashaInterestsStreamInput!) {
  updateAkashaInterestsStream(input: $i) {
    document {
      ...AkashaInterestsStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaInterestsStreamFragmentDoc}`;
export const IndexAkashaAppsStreamDocument = /*#__PURE__*/ gql`
    mutation IndexAkashaAppsStream($i: CreateAkashaAppsStreamInput!) {
  createAkashaAppsStream(input: $i) {
    document {
      ...AkashaAppsStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaAppsStreamFragmentDoc}`;
export const UpdateAkashaAppsStreamDocument = /*#__PURE__*/ gql`
    mutation UpdateAkashaAppsStream($i: UpdateAkashaAppsStreamInput!) {
  updateAkashaAppsStream(input: $i) {
    document {
      ...AkashaAppsStreamFragment
    }
    clientMutationId
  }
}
    ${AkashaAppsStreamFragmentDoc}`;
export const GetReflectionByIdDocument = /*#__PURE__*/ gql`
    query GetReflectionById($id: ID!) {
  node(id: $id) {
    ... on AkashaReflect {
      id
      beamID
      nsfw
      createdAt
      active
    }
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    IndexProfileStream(variables: IndexProfileStreamMutationVariables, options?: C): Promise<IndexProfileStreamMutation> {
      return requester<IndexProfileStreamMutation, IndexProfileStreamMutationVariables>(IndexProfileStreamDocument, variables, options) as Promise<IndexProfileStreamMutation>;
    },
    UpdateProfileStream(variables: UpdateProfileStreamMutationVariables, options?: C): Promise<UpdateProfileStreamMutation> {
      return requester<UpdateProfileStreamMutation, UpdateProfileStreamMutationVariables>(UpdateProfileStreamDocument, variables, options) as Promise<UpdateProfileStreamMutation>;
    },
    IndexBeamStream(variables: IndexBeamStreamMutationVariables, options?: C): Promise<IndexBeamStreamMutation> {
      return requester<IndexBeamStreamMutation, IndexBeamStreamMutationVariables>(IndexBeamStreamDocument, variables, options) as Promise<IndexBeamStreamMutation>;
    },
    UpdateBeamStream(variables: UpdateBeamStreamMutationVariables, options?: C): Promise<UpdateBeamStreamMutation> {
      return requester<UpdateBeamStreamMutation, UpdateBeamStreamMutationVariables>(UpdateBeamStreamDocument, variables, options) as Promise<UpdateBeamStreamMutation>;
    },
    IndexContentBlockStream(variables: IndexContentBlockStreamMutationVariables, options?: C): Promise<IndexContentBlockStreamMutation> {
      return requester<IndexContentBlockStreamMutation, IndexContentBlockStreamMutationVariables>(IndexContentBlockStreamDocument, variables, options) as Promise<IndexContentBlockStreamMutation>;
    },
    UpdateContentBlockStream(variables: UpdateContentBlockStreamMutationVariables, options?: C): Promise<UpdateContentBlockStreamMutation> {
      return requester<UpdateContentBlockStreamMutation, UpdateContentBlockStreamMutationVariables>(UpdateContentBlockStreamDocument, variables, options) as Promise<UpdateContentBlockStreamMutation>;
    },
    IndexAkashaReflectStream(variables: IndexAkashaReflectStreamMutationVariables, options?: C): Promise<IndexAkashaReflectStreamMutation> {
      return requester<IndexAkashaReflectStreamMutation, IndexAkashaReflectStreamMutationVariables>(IndexAkashaReflectStreamDocument, variables, options) as Promise<IndexAkashaReflectStreamMutation>;
    },
    UpdateAkashaReflectStream(variables: UpdateAkashaReflectStreamMutationVariables, options?: C): Promise<UpdateAkashaReflectStreamMutation> {
      return requester<UpdateAkashaReflectStreamMutation, UpdateAkashaReflectStreamMutationVariables>(UpdateAkashaReflectStreamDocument, variables, options) as Promise<UpdateAkashaReflectStreamMutation>;
    },
    IndexAkashaInterestsStream(variables: IndexAkashaInterestsStreamMutationVariables, options?: C): Promise<IndexAkashaInterestsStreamMutation> {
      return requester<IndexAkashaInterestsStreamMutation, IndexAkashaInterestsStreamMutationVariables>(IndexAkashaInterestsStreamDocument, variables, options) as Promise<IndexAkashaInterestsStreamMutation>;
    },
    UpdateAkashaInterestsStream(variables: UpdateAkashaInterestsStreamMutationVariables, options?: C): Promise<UpdateAkashaInterestsStreamMutation> {
      return requester<UpdateAkashaInterestsStreamMutation, UpdateAkashaInterestsStreamMutationVariables>(UpdateAkashaInterestsStreamDocument, variables, options) as Promise<UpdateAkashaInterestsStreamMutation>;
    },
    IndexAkashaAppsStream(variables: IndexAkashaAppsStreamMutationVariables, options?: C): Promise<IndexAkashaAppsStreamMutation> {
      return requester<IndexAkashaAppsStreamMutation, IndexAkashaAppsStreamMutationVariables>(IndexAkashaAppsStreamDocument, variables, options) as Promise<IndexAkashaAppsStreamMutation>;
    },
    UpdateAkashaAppsStream(variables: UpdateAkashaAppsStreamMutationVariables, options?: C): Promise<UpdateAkashaAppsStreamMutation> {
      return requester<UpdateAkashaAppsStreamMutation, UpdateAkashaAppsStreamMutationVariables>(UpdateAkashaAppsStreamDocument, variables, options) as Promise<UpdateAkashaAppsStreamMutation>;
    },
    GetReflectionById(variables: GetReflectionByIdQueryVariables, options?: C): Promise<GetReflectionByIdQuery> {
      return requester<GetReflectionByIdQuery, GetReflectionByIdQueryVariables>(GetReflectionByIdDocument, variables, options) as Promise<GetReflectionByIdQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
