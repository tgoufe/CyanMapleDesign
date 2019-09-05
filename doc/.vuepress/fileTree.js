var fs = require('fs');


//�����ļ��У���ȡ�����ļ���������ļ���Ϣ
/*
 * @param path ·��
 *
 */

function geFileList(paths,list){
    if(typeof paths === 'string'){
        paths = [paths];
    }else if(!Array.isArray(paths)){
        return [];
    }
    paths.forEach(function(path){
        var files = fs.readdirSync(path);
        files.forEach(function(i){
            var state = fs.statSync(path + '/' + i);
            if(state.isDirectory()){
                geFileList(path + '/' + i,list)
            }else if(state.isFile() && (path + '/' + i).indexOf('.svn') < 0){
                list.push({
                    path:path + '/' + i,
                    name:i,
                    size:state.size
                });
            }
        });
    })


}

module.exports = {
    list:function(paths){
        var list = [];
        geFileList(paths,list);
        return list;
    }
};
