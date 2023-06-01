'use strict';

const { io } =  require('socket.io-client');
const socket =  io('http://localhost:3001/caps');

const { orderHandler, thankDriver } = require('./handler');

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  return {
    io: jest.fn().mockReturnValue({
      emit,
      on,
    }),
  };
});

let consoleSpy;

beforeAll(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterAll(() => {
  consoleSpy.mockRestore();
});

describe('Vendor handlers', () => {

  test('Should log correct emit and console log for orderHandler', () => {
    let payload = {
      orderId: 12345,
    };

    orderHandler(payload);

    expect(socket.emit).toHaveBeenCalledWith('pickup', payload);
  });

  test('Should log correct emit and console log for deliveredMessage', () => {
    let payload = {
      customer: 'Test Test',
    };

    thankDriver(payload);

    expect(consoleSpy).toHaveBeenCalledWith('VENDOR: Thank you for your order', payload.customer);
  });

});