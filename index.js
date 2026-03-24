const { format } = require('date-fns');

console.log(format(new Date(), 'yyyy-MM-d\tHH:mm:ss'));

const { v4: uuid } = require('uuid');
console.log(uuid());

console.log();