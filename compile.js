const path = require('path');   // for genetating path for cross-platform compatibility
const fs = require('fs');   // file system
const solc = require('solc');   // solidity compiler

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');    // path from compile to inbox.sol
const source = fs.readFileSync(lotteryPath, 'utf8');  // read the file

module.exports = solc.compile(source, 1).contracts[':Lottery'];   // exports the compiled contract object