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
  description: 'An address book record',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    }
  }
});

const RecordListType = new GraphQLObjectType({
  name: 'RecordList',
  description: 'A list of address book record',
  fields: {
    id: {
      type: GraphQLID
    },
    count: {
      type: GraphQLInt
    },
    records: {
      type: new GraphQLList(RecordType)
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
            records.sort((a, b) => {
              return a.id - b.id;
            });
            resolve(records);
          });
        });
      }
    },
    recordList: {
      type: RecordListType,
      resolve() {
        return new Promise((resolve, reject) => {
          db.record.find().toArray((err, records) => {
            if(err) {
              reject(err);
            }
            resolve({ id: 'recordList', count: records.length, records });
          });
        });
      }
    },
    record: {
      type: RecordType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          let id = parseInt(args.id);
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

const AddRecordPayload = new GraphQLObjectType({
  name: '_AddRecordPayload',
  fields: {
    new_record: {
      type: RecordType
    },
    record_list: {
      type: RecordListType
    }
  }
});

const AddRecord = mutationWithClientMutationId({
  name: 'AddRecord',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    country: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    new_record: {
      type: RecordType,
      resolve(payload) {
        return payload.new_record;
      }
    },
    record_list: {
      type: RecordListType,
      resolve() {
        return new Promise((resolve, reject) => {
          db.record.find().toArray((err, records) => {
            if(err) {
              reject(err);
            }
            resolve({ id: 'recordList', count: records.length, records });
          });
        });
      }
    }
  },
  mutateAndGetPayload(input) {
    return new Promise((resolve, reject) => {
      db.record.count((err, count) => {
        if(err) {
          reject(err);
        }
        let id = count + 1;
        let data = { id, ...input };
        db.record.insert(data, (err) => {
          if(err) {
            reject(err);
          }
          resolve({ new_record: data });
        });
      });
    });
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add_record: AddRecord
  }
});

export const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
