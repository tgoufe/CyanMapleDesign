import confirmVue from "./index.vue";
let defaults = _.mapValues(confirmVue.props,item=>item.default);
Vue.component('cmui-confirm', confirmVue);
let id = 'cmui-confirm-' + _.uniqueId();
let CURRENT = null;
let setCurrent = _.once(function() {
    window && $('<cmui-confirm id="' + id + '">').appendTo('body');
    CURRENT = new Vue({
        el: '#' + id
    }).$children[0];
});

function confirm() {
    setCurrent();
    let options = {};
    if (arguments) {
        if (arguments.length > 1) {
            let fnList = _.filter(arguments, _.isFunction);
            options.okFn = fnList[0];
            options.cancelFn = fnList[1];
            options.callback = fnList[2];
            let stringList = _.filter(arguments, item => (typeof item).match(/string|number|boolean/)).map(item => item.toString());
            options.content = _.last(stringList);
            if (stringList.length > 1) {
                options.title = stringList[0];
            }
        } else {
            if ((typeof arguments[0]).match(/string|number|boolean/)) {
                options.content = arguments[0];
            } else if (_.isObject(arguments[0])) {
                options = arguments[0];
            } else {
                return CURRENT;
            }
        }
    } else {
        return CURRENT;
    }
    options = _.defaults(_.find(arguments, _.isPlainObject), options, defaults);
    _.each(options, (value, key) => {
        CURRENT[key] = value;
    });
    CURRENT.visible = true;
    if (typeof options.callback === 'function') {
        CURRENT.$nextTick(function() {
            options.callback($(CURRENT.$el));
        });
    }
    return CURRENT;
}
export default confirm;