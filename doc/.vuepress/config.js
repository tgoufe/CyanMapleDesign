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
    base:'/cyanMapleDoc/',
    dest:'../cmui',
    serviceWorker:true,
    evergreen: true,
    cache:false,
    themeConfig:{
        sidebar: {
            '/Cyan/': [
                '',
                'build',
                'grid',
                'img',
                'ratio',
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
            '/components/':[
                '',
                {
                    title:'弹层组件',
                    children : ['alert','confirm','actions','notice','pick','datePicker','mask']
                },
                {
                    title:'展示类组件',
                    children : ['captcha','countdown','image','slider','progress','slidebar']
                },
                {
                    title:'布局组件',
                    children : ['list','virtualList','affix','tabbar','collapse','scroll']
                },
                {
                    title:'form表单组件',
                    children:['input','checkbox','radio','number','select','textarea'].map(i=>`form/${i}`)
                }
            ],
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
    configureWebpack: config => {
        config.resolve.extensions = ['.js', '.vue']
        config.resolve.alias.dom = path.resolve(__dirname, '../../src/maple/methods/dom-ssr')
        config.resolve.alias['@components']=path.resolve(__dirname, '../../src/maple/components')
    },

};
