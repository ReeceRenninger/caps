'use strict';

const { describe } = require('yargs');
let eventEmitter = require('../eventPool');
const { pickupOccured, packageDelivered } = require('./handler');
const { test } = require('node:test');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('Testing driver handlers', () => {
  test('log and emit in-transit', () => {

  });
});