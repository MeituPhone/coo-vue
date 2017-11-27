import Vue from 'vue';
import Toast from './toast.vue';
let ToastExtend = Vue.extend(Toast);

class ToastUse {
    constructor (options = {}) {
        this.options = options;
        this.instance = new ToastExtend({
            data: this.options
        });
        this.instance.vm = this.instance.$mount();
        document.body.appendChild(this.instance.vm.$el);
    }
    close () {
        this.instance.close();
    }
};

const ToastInstance = (options = {}) => {
    return new ToastUse(options);
};

export default ToastInstance;
