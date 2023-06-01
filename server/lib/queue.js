'use strict';

class Queue {
  constructor(){
    this.data = {};
  }

  store(key,value ){
    this.data[key] = value;
    console.log('Message was stored');
    return key;
  }

  read(key){
    return this.data[key];
  }

  remove(key){
    let value = this.data[key];
    delete this.data[key];
    return value; // returns what was deleted
  }
}

module.exports = Queue;