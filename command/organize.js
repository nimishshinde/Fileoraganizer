let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organize(srcPath){
    //check for is the path not given 
    if(srcPath == undefined){
        srcPath = process.cwd();
    }

    //creating directory 
    let organizeFilePath = path.join(srcPath, "Organized_Files");
    if(fs.existsSync(organizeFilePath) == false){
        fs.mkdirSync(organizeFilePath);
    }

    //reading the files from the srcPath
    let allTheFiles = fs.readdirSync(srcPath);
    for(let i=0; i<allTheFiles.length; i++){
        //getting the extname and folder in which it has to based
        let fullOrginalPath = path.join(srcPath, allTheFiles[i]);
        if(fs.lstatSync(fullOrginalPath).isFile() == true){
            let folderName = getExtensionNameAndDirectory(allTheFiles[i]);
            copyFileTODest(folderName, fullOrginalPath, srcPath);
        }
    }
}

function copyFileTODest(folderName, fullOrginalPath, srcPath){
    let destFolderPath = path.join(srcPath ,"Organized_Files", folderName);

    //if foldername doesnt exists already 
    if(fs.existsSync(destFolderPath) == false){
        fs.mkdirSync(destFolderPath);
    }

    let originalFileName = path.basename(fullOrginalPath);
    let destFilePath = path.join(destFolderPath, originalFileName);
    fs.copyFileSync(fullOrginalPath, destFilePath);
    console.log(originalFileName, "copeid to -->", folderName);
}

function getExtensionNameAndDirectory(file){
    let extName = path.extname(file);
    extName = extName.slice(1);
    for(let key in types) {
        for(let i=0; i<types[key].length; i++) {
            if(extName == types[key][i])
            return key;  
        }
    }
    return "Others";
}

module.exports = {
    organizefn : organize
}
