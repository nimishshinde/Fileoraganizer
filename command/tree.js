let fs = require("fs");
let path = require("path");

function tree(srcPath){
    if(srcPath == undefined  || srcPath == ""){
        srcPath = process.cwd();
    }
    let content = fs.readdirSync(srcPath); // readdirSync return array of all files and folder in the given path/directory
    let parentNameOfDirectory = path.basename(srcPath);    
    let completePath = "└──" + parentNameOfDirectory;
    for(let i=0; i<content.length; i++){
        completePath = completePath +"\n \t"+ "├──" + content[i];
    }
    console.log(completePath);
}

module.exports = {
    treefn : tree
}