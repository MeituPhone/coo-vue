import {addClass, removeClass, addEventListener, winScroll} from '../utils/dom';
let _zIndex = 2000;
let _dialogStack = [];
let _instances = {};
let _maskElement;
let _dialogId = 0;

const onMaskClick = () => {
    // 获取最后打开的对话框
    let lastInstance = _dialogStack.length ? _dialogStack[_dialogStack.length - 1] : null;
    if (lastInstance) {
        _instances[lastInstance.id].handleClose();
    }
};

const getNextIndex = () => {
    _zIndex++;
    return _zIndex;
};

// 设置蒙层
const setModalMask = (modalId, zIndex) => {
    _dialogStack.push({id: modalId, zIndex: zIndex});
    if (_maskElement) {
        _maskElement.style.zIndex = zIndex;
        return _maskElement;
    }
    let maskElement = document.createElement('div');
    maskElement.style.zIndex = zIndex;
    addEventListener(maskElement, 'click', onMaskClick);
    addClass(maskElement, 'coo-mask');
    addClass(maskElement, 'dialog-fade-enter-active');
    setTimeout(() => {
        removeClass(maskElement, 'dialog-fade-enter-active');
    }, 300);
    document.body.appendChild(maskElement);
    _maskElement = maskElement;
};

const closeModalMask = (dialogId, dialog) => {
    _dialogStack.pop();
    let lastInstance = _dialogStack.length ? _dialogStack[_dialogStack.length - 1] : null;
    if (lastInstance) {
        setTimeout(() => {
            _maskElement.style.zIndex = lastInstance.zIndex;
        }, 200);
        _maskElement.removeEventListener('click', onMaskClick);
    } else {
        addClass(_maskElement, 'dialog-fade-leave-active');
        setTimeout(() => {
            removeClass(_maskElement, 'dialog-fade-leave-active');
            _maskElement.parentNode.removeChild(_maskElement);
            _maskElement = null;
        }, 200);
    }
};

export default {
    model: {
        prop: 'visible',
        event: 'visible-change',
    },
    props: {
        appendToBody: {
            type: Boolean,
            default: false,
        },
    },
    created () {

    },
    beforeMount () {
        this._dialogId = `mt-modal-${_dialogId++}`;
        _instances[this._dialogId] = this;
    },
    beforeDestroy () {
        _instances._dialogId = null;
        delete _instances._dialogId;
    },
    data () {
        return {};
    },
    watch: {
        visible (val) {
            if (val) {
                this.open();
                if (this.$props.lock) {
                    winScroll(false);
                }
            } else {
                this.close();
                if (this.$props.lock) {
                    winScroll(true);
                }
            }
        },
    },
    methods: {
        open () {
            let zIndex = getNextIndex();
            setModalMask(this._dialogId, zIndex);
            const dom = this.$el;
            if (this.$props.appendToBody) {
                document.body.appendChild(dom);
            }
            dom.style.zIndex = getNextIndex();
            this.$emit('visible-change', true);
        },
        close () {
            closeModalMask(this._dialogId);
            this.$emit('visible-change', false);
        },
    },
};
