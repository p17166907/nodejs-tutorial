
//To use external node modules
//We need to install external modules first
//e.g. $npm i lodash

const _ = require('lodash');

const items = [1, [2, [3, 4]]]
const newItems = _.flattenDeep(items);
console.log(newItems); //prints: [1, 2, 3, 4]