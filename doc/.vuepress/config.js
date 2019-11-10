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
function getlist(name){
    return getFiles('./doc/'+name, false).reduce((rs, {path, name}) => {
        if(/\.md$/.test(name)&&name!=='README.md'){
            rs.push(`${name}`);
        }
        return rs;
    },['']);
}
module.exports = {
    title: 'CyanMaple',
    description: '高效的描述型框架，简单不简单',
    base:'/cmui/',
    dest:'../cmui',
    serviceWorker:true,
    evergreen: true,
    themeConfig:{
        sidebar: {
            '/Cyan/': [
                '',
                'build',
                'layout',
                'grid',
                'img',
                'flex',
                'list',
                'layout_assist',
                'offset',
                'color_and_size',
                'type',
                'border',
                'button',
                'form',
                'icon',
            ],
            '/components/':getlist('components'),
            '/methods/':getlist('methods'),
            '/': []
        },
        nav:[
            {text:'样式',link:'/Cyan/'},
            {text:'组件',link:'/components/'},
            {text:'方法',link:'/methods/'},
            {text:'官网',items:[
                    {text:'官网',link:'http://www.bingshangroup.com'},
                    {text:'陪你读书',link:'https://www.ximalaya.com/jiaoyu/3740790/'},
                    {text:'立体二维码',link:'http://www.bingshangroup.com#/qc'}
                ]},
            {text:'技术博客',link:'http://www.bingshangroup.com/blog2'}
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@components': '../../../src/maple/components'
            }
        }
    }

};
