export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['Int'];
  name: Scalars['String'];
  messages?: Maybe<Array<Maybe<Message>>>;
  users?: Maybe<Array<Maybe<User>>>;
  shared: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type CreateChannelResponse = {
  __typename?: 'CreateChannelResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type GetAllUsersResponse = {
  __typename?: 'GetAllUsersResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type GetUserResponse = {
  __typename?: 'GetUserResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type JoinChannelResponse = {
  __typename?: 'JoinChannelResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  content: Scalars['String'];
  channel: Channel;
  channelId: Scalars['Int'];
  sender: User;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateChannel: CreateChannelResponse;
  CreateUser: CreateUserResponse;
  JoinChannel: JoinChannelResponse;
  PostMessage: PostMessageResponse;
  SignIn: SignInResponse;
};


export type MutationCreateChannelArgs = {
  name: Scalars['String'];
  shared?: Scalars['Boolean'];
  userId: Scalars['Int'];
};


export type MutationCreateUserArgs = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationJoinChannelArgs = {
  channelId: Scalars['Int'];
};


export type MutationPostMessageArgs = {
  channelId: Scalars['Int'];
  content: Scalars['String'];
};


export type MutationSignInArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type PostMessageResponse = {
  __typename?: 'PostMessageResponse';
  ok: Scalars['Boolean'];
  message?: Maybe<Message>;
  error?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  GetAllUsers: GetAllUsersResponse;
  GetChannelById: ResponseGetChannelById;
  GetUser: GetUserResponse;
};


export type QueryGetChannelByIdArgs = {
  channelId: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type ResponseGetChannelById = {
  __typename?: 'ResponseGetChannelById';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  channel?: Maybe<Channel>;
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  ChannelSubscription?: Maybe<Channel>;
  MessageSubscription?: Maybe<Message>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  messages?: Maybe<Array<Maybe<Message>>>;
  channels?: Maybe<Array<Maybe<Channel>>>;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};
