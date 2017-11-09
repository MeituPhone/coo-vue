// 判断className
export const hasClass = (element, className) => {
    if (!element || !className) return false;
    if (className.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (element.classList) {
        return element.classList.contains(className);
    } else {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
};

// 添加样式
export const addClass = (element, className) => {
    if (!element) return;
    let currentClass = element.className;
    let classes = (className || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];
        if (!clsName) continue;

        if (element.classList) {
            element.classList.add(clsName);
        } else {
            if (!hasClass(element, clsName)) {
                currentClass += ' ' + clsName;
            }
        }
    }
    if (!element.classList) {
        element.className = currentClass;
    }
};

// 移除样式
export const removeClass = (element, className) => {
    if (!element || !className) return;
    let classes = className.split(' ');
    let curClass = ' ' + element.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];
        if (!clsName) continue;

        if (element.classList) {
            element.classList.remove(clsName);
        } else {
            if (hasClass(element, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!element.classList) {
        element.className = curClass;
    }
};

// 添加事件监听
export const addEventListener = (() => {
    if (document.addEventListener) {
        return (element, event, handler) => {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return (element, event, handler) => {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

// 获取滚动条宽度
let scrollBarWidth;
export const SCROLL_BAR_WIDTH = () => {
    if (scrollBarWidth !== undefined) return scrollBarWidth;
    const outer = document.createElement('div');
    outer.className = 'coo-scrollbar__wrap';
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
};

// 设置屏幕滚动
export const winScroll = (canScroll) => {
    if (canScroll) {
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
        document.getElementsByTagName('html')[0].style.paddingRight = '0px';
    } else {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        document.getElementsByTagName('html')[0].style.paddingRight = `${SCROLL_BAR_WIDTH()}px`;
    }
};
