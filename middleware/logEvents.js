const { format } = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

console.log(format(new Date(), 'yyyy-MM-d\tHH:mm:ss'));
console.log(uuid());
console.log();


const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-d\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname,  'logs'));
        }
        //test write to file
        await fsPromises.appendFile(path.join(__dirname,'eventLog.txt'), logItem);  
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.url}`);
    next();
}
// func: remove old log files and start fresh on each server start
const deleteLogs = async () => {
    try {
        if (fs.existsSync(path.join(__dirname, '..', 'middleware', 'eventLog.txt'))) {
            await fsPromises.unlink(path.join(__dirname, '..', 'middleware', 'eventLog.txt'));
            console.log('Old log file deleted');
        } else {
            console.log('No log file to delete');
        }
    } catch (err) {
        console.log(err);
    }
}   

module.exports = { logEvents, logger, deleteLogs };
