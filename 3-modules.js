//Common JS, every file is a module
//Modules - Encapsulates Codse (only share minimuin)

const { john, peter } = require('./4-namesModule.js');
const { sayHi } = require('./5-utils.js');
require('./7-mind-grenade.js');

sayHi(john);
console.log(john, peter);