import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import Promise from 'bluebird';
import mongo from 'mongoskin';

const db = mongo.db('mongodb://localhost:27017/address', { native_parser: true });
db.bind('record');

const RecordType =  new GraphQLObjectType({
  name: 'Record',
  description: 'A address book record',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    records: {
      type: new GraphQLList(RecordType),
      resolve() {
        return new Promise((resolve, reject) => {
          db.record.find().toArray((err, records) => {
            if(err) {
              reject(err);
            }
            resolve(records);
          });
        });
      }
    },
    record: {
      type: RecordType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let id = args.id;
          let query = { id };
          db.record.findOne(query, (err, records) => {
            if(err) {
              reject(err);
            }
            resolve(records);
          });
        });
      }
    }
  }
});

export const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
