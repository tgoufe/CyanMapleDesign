if( !('Promise' in window) ){
    window.Promise = function(exec){
        var defer = $.Deferred();

        exec(defer.resolve, defer.reject);

        return defer.promise();
    };

    window.Promise.all = function(arr){
        var i = 0
            , j = arr.length
            , defer = $.Deferred()
            , rs = new Array(j)
            ;

        arr.map((d, index)=>{
            d.then(function(obj){
                i++;

                rs[index] = obj;

                if( i === j ){
                    defer.resolve(rs);
                }
            });
        });

        return defer.promise();
    }
}

function loadIframe(src){
    return new Promise(function(resolve, reject){
        let dom = document.createElement('iframe');
        dom.onload = function(){
            // var obj = {};
            // obj[src] = this;
            //
            // console.log(src, ' 加载成功');
            resolve( this );
        };
        dom.onerror = function(){
            // var obj = {};
            // obj[src] = null;
            // console.log(src, ' 加载失败', arguments);
            resolve( null );
        };
        dom.style.display = 'none';
        dom.src = src;
        document.body.appendChild( dom );
    });
}

function loadImg(src){
    return new Promise(function(resolve, reject){
        let dom = document.createElement('img');
        dom.onload = function(){
            // var obj = {};
            // obj[src] = this;
            //
            // console.log(src, ' 加载成功');
            resolve(this);
        };
        dom.onerror = function(){
            // var obj = {};
            // obj[src] = null;
            // console.log(src, ' 加载失败', arguments);
            resolve( null );
        };
        dom.src = src;
    });
}


export default function(options={}){
    // function success(arr){
    //     alert(11)
    //     if(typeof options.success=='function'){
    //         options.success(arr.length==1?arr[0]:arr)
    //     }
    // }

    var arr = []
        , result
        ;
    if(typeof options.url=='string'){
        arr.push(options.url)
    }
    else if( Array.isArray( options.url ) && options.url.every(item=>typeof item === 'string') ){
        arr = options.url
    }
    else{
        return
    }

    switch( options.type ){
        case 'image':
        case 'img':
            result = Promise.all( arr.map(loadImg) );
            break;
        case 'iframe':
            result = Promise.all( arr.map(loadIframe) );
            break;
        default:
            break;
    }

    result.then(function(rs){
        var succ = rs.filter(d=>d!==null)
            , fail = rs.filter(d=>d===null)
            ;
        options.success && options.success( rs.length > 1 ? rs : rs[0] );
        // options.error && options.error(  )
    }, function(){

    });
    // if(options.type=='image'||options.type=='img'){
    //
    // }
    // else if(options.type=='iframe'){
    //
    //     var iframeArr=[]
    //
    //     arr.forEach(function(item,index,array){
    //         var iframe = document.createElement("iframe");
    //         iframe.src = item;
    //         if (iframe.attachEvent) {
    //             iframe.attachEvent("onload", function() {
    //                 iframeArray.push(iframe)
    //                 if(iframe.Array.length=arr.length){
    //                     success(iframe)
    //                 }
    //             });
    //         } else {
    //             iframe.onload = function() {
    //                 iframeArray.push(iframe)
    //                 if(iframe.Array.length=arr.length){
    //                     success(iframe)
    //                 }
    //             };
    //         }
    //     })
    // }
}