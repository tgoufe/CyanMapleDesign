function Url(url){
    return new Url.prototype.init(url);
}

Url.prototype.init = function(url) {
    var a = document.createElement('a');
    a.href = url||location.href;
    this.source= url||location.href;
    this.protocol= a.protocol.replace(':', '');
    this.host= a.hostname;
    this.port= a.port;
    this.query=a.search;
    this.params= (function() {
        var ret = {},
            seg = a.search.replace(/^\?/, '').split('&'),
            len = seg.length,
            i = 0,
            s;
        for (; i < len; i++) {
            if (!seg[i]) {
                continue;
            }
            s = seg[i].split('=');
            ret[s[0]] = s[1];
            //删除微信下的?10000skip
            if(ret[s[0]] && typeof ret[s[0]]==='string'){
                ret[s[0]]=ret[s[0]].replace(/\?10000skip(=true)?/,'')
            }
        }
        return ret;
    })();
    this.file= (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1];
    this.hash= a.hash.replace('#', '');
    this.path= a.pathname.replace(/^([^\/])/, '/$1');
    this.relative= (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1];
    this.segments= a.pathname.replace(/^\//, '').split('/');
    this.isUrl=(function (url){
        var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
        return !!regular.test(url)
    })(this.source);
    return this;
};
Url.prototype.init.prototype=Url.prototype;
Url.prototype.replace=function(){
    var key
        , argc = arguments[0]
        , i, l, t
        , search = []
        ;

    switch(typeof argc){
        case 'string':
            for( i = 0, l = arguments.length; i < l; i++){
                t = arguments[i];

                if( typeof t === 'string' ){
                    delete this.params[t];
                }
            }
            break;
        case 'object':
            for( key in argc ) if( argc.hasOwnProperty(key) ){
                this.params[key] = argc[key];
            }
            break;
        default:
            break;
    }

    for( key in this.params ) if( this.params.hasOwnProperty(key) ){
        search.push( key +'='+ this.params[key] );
    }

    this.query = search.length ? '?'+ search.join('&') : '';

    history.replaceState(null, '', this.pack());

    return this;
};
Url.prototype.push=function(){
    var key
        , argc = arguments[0]
        , i, l, t
        , search = []
        ;

    switch(typeof argc){
        case 'string':
            for( i = 0, l = arguments.length; i < l; i++){
                t = arguments[i];

                if( typeof t === 'string' ){
                    delete this.params[t];
                }
            }
            break;
        case 'object':
            for( key in argc ) if( argc.hasOwnProperty(key) ){
                this.params[key] = argc[key];
            }
            break;
        default:
            break;
    }

    for( key in this.params ) if( this.params.hasOwnProperty(key) ){
        search.push( key +'='+ this.params[key] );
    }

    this.query = search.length ? '?'+ search.join('&') : '';

    location.href = this.pack();
};
Url.prototype.pack = function(){
    return this.protocol +'://'+
        this.host +
        (!this.port || this.port === '80' ? '' : ':'+ this.port) +
        this.path +
        this.query +
        (this.hash ? '#'+ this.hash : '');
};
Url.prototype.init.call(Url);

export default Url;
