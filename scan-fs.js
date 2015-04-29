fs = require('fs');

var res = scanFolder("posts");

function scanFolder(path){
    var fileList = [],
        walk = function(path, fileList){
            files = fs.readdirSync(path);
            files.forEach(function(item) {  
                var tmpPath = path + '/' + item,
                    stats = fs.statSync(tmpPath);

                if (stats.isDirectory()) {  
                    walk(tmpPath, fileList); 
                } else {  
                    fileList.push(tmpPath); 
                }  
            });  
        };  

    walk(path, fileList);

    console.log('扫描' + path +'成功');
    console.log('\nfiles: ' + fileList );

    return fileList;
}
    console.log('\nfiles: ' + res );
res.forEach(function(file){
    console.log(file +'\n');
});
