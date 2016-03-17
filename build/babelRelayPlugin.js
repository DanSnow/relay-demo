require('babel-register');

var getBabelRelayPlugin = require('babel-relay-plugin');

var schemaData = require('../data/schema.json');

var plugin = getBabelRelayPlugin(schemaData.data);

module.exports = plugin;
