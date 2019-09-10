let fs=require('fs');
let path=require('path');
function getFiles(filePath,deep=true){
    return fs.readdirSync(filePath).reduce((rs,i)=>{
        let tpath=path.join(filePath,i);
        return rs.concat(
            fs.statSync(tpath).isDirectory()?
                (deep?getFiles(tpath):[]):
                {path:tpath,name:i}
        )
    },[])
}
let componentsList=getFiles('./doc',false).reduce((rs,{path,name})=>{
    if(/\.md$/.test(name)&&name!=='README.md'){
        rs.push(`${name}`)
    }
    return rs;
},[]);
let cyanList=getFiles('./doc/Cyan', false).reduce((rs, {path, name}) => {
    if(/\.md$/.test(name)&&name!=='README.md'){
        rs.push(`Cyan/${name}`)
    }
    return rs;
},[]);
module.exports = {
    title: '欢迎使用CyanMaple',
    description: 'Just playing around',
    serviceWorker:true,
    themeConfig:{
        sidebar:[
            '/',
            {
                title:'Cyan',
                children:cyanList,
            },
            '/methodsAPI.md',
            {
                title:'组件',
                children:componentsList
            },

        ],
        nav:[
            {text:'冰山工作室官网',items:[
                    {text:'官网',link:'http://www.bingshangroup.com'},
                    {text:'陪你读书',link:'https://www.ximalaya.com/jiaoyu/3740790/'},
                    {text:'立体二维码',link:'http://www.bingshangroup.com#/qc'}
                ]},
            {text:'官网博客',link:'http://www.bingshangroup.com/blog'}
        ]
    }
};