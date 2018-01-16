<template>
    <div>
        <div class="cmui-affix" :style="styles">
            <slot></slot>
        </div>
    </div>
</template>

<script>
/**
 * 以下代码来自于饿了么组件实在不想重写了
 */
import vm from "../../vm.js";
function getScroll(target, top) {
    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    let ret = target[prop];
    if (typeof ret !== 'number') {
        ret = window.document.documentElement[method];
    }
    return ret;
}
function getOffset(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = getScroll(window, true);
    const scrollLeft = getScroll(window);
    const docEl = window.document.body;
    const clientTop = docEl.clientTop || 0;
    const clientLeft = docEl.clientLeft || 0;
    return {
        top: rect.top + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft
    };
}
export default {
    props: {
        top: {
            type: Number,
            default: 0
        },
        bottom: {
            type: Number
        }
    },
    data () {
        return {
            affix: false,
            styles: {}
        };
    },
    computed: {
        offsetType () {
            let type = 'top';
            if (this.bottom >= 0) {
                type = 'bottom';
            }
            return type;
        }
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll, false);
        window.addEventListener('resize', this.handleScroll, false);
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll, false);
        window.removeEventListener('resize', this.handleScroll, false);
    },
    methods: {
        handleScroll () {
            const affix = this.affix;
            const scrollTop = getScroll(window, true);
            const elOffset = getOffset(this.$el);
            const windowHeight = window.innerHeight;
            const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight;
            // Fixed Top
            if ((elOffset.top - this.top) < scrollTop && this.offsetType == 'top' && !affix) {
                this.affix = true;
                this.styles = {
                    top: `${this.top}px`,
                    left: `${elOffset.left}px`,
                    width: `${this.$el.offsetWidth}px`,
                    position:'fixed'
                };
                vm.$emit('on-change', true);
            } else if ((elOffset.top - this.top) > scrollTop && this.offsetType == 'top' && affix) {
                this.affix = false;
                this.styles = null;
                vm.$emit('on-change', false);
            }
            // Fixed Bottom
            if ((elOffset.top + this.bottom + elHeight) > (scrollTop + windowHeight) && this.offsetType == 'bottom' && !affix) {
                this.affix = true;
                this.styles = {
                    bottom: `${this.bottom}px`,
                    left: `${elOffset.left}px`,
                    width: `${this.$el.offsetWidth}px`,
                    position:'fixed'
                };
                vm.$emit('on-change', true);
            } else if ((elOffset.top + this.bottom + elHeight) < (scrollTop + windowHeight) && this.offsetType == 'bottom' && affix) {
                this.affix = false;
                this.styles = null;
                vm.$emit('on-change', false);
            }
        }
    }
};
</script>
