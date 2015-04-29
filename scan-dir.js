fs = require('fs');

var res = scanFolder("posts");

function scanFolder(path){
    var fileList = [],
        folderList = [],
        walk = function(path, fileList, folderList){
            files = fs.readdirSync(path);
            files.forEach(function(item) {  
                var tmpPath = path + '/' + item,
                    stats = fs.statSync(tmpPath);

                if (stats.isDirectory()) {  
                    walk(tmpPath, fileList, folderList); 
                    folderList.push(tmpPath); 
                } else {  
                    fileList.push(tmpPath); 
                }  
            });  
        };  

    walk(path, fileList, folderList);

    console.log('扫描' + path +'成功');

    return {
        'files': fileList,
        'folders': folderList
    }
}
    console.log('\nfolders: ' + res.folders );
    console.log('\nfiles: ' + res.files );
