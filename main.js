//Input
// M:\.PEPCODING\src
let inputArr = process.argv.slice(2);
//slice first two element of the input 

let helpObj = require("./command/help");
let treeObj =require("./command/tree");
let organizeObj = require("./command/organize");

let cmd = inputArr[0];
//getting the command 

switch(cmd){
    case "help":
        helpObj.helpfn();
        break;
    case "tree":
        treeObj.treefn(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizefn(inputArr[1]);
        break;
    default: 
        console.log(`Wrong Command...
        🙏Kindly Enter Right Command`);
        break;
}