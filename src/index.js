import Vue from 'vue';

// 工具库
import dateUtil from './util/date_util';
/* import deviceUtil from './util/device_util'; */
import domUtil from './util/dom_util';
import validUtil from './util/valid_util';
import dataUtil from './util/data_util';

// 指令
import './directive';

// 使用vue.use()可注入全局
import dialog from './dialog';
import keyboard from './keyboard';

// 组件
import numberKeyboard from './number_keyboard';
import xswitch from './switch';
import xcheckbox from './checkbox';
import xRadio from './radio';
import xSelect from './select';
import xTree from './tree';
import xTransfer from './transfer';
import xInputNumber from './input_number';

const components = [
    numberKeyboard,
    xswitch,
    xcheckbox,
    xRadio,
    xSelect,
    xTree,
    xTransfer,
    xInputNumber
];

export default {
    install(vue) {
        vue.prototype.$xdialog = dialog;
        vue.prototype.$xkeyboard = keyboard;
        components.forEach(component => {
            Vue.component(component.name, component);
        });
    }
}

export {
    dateUtil,
    /* deviceUtil, */
    domUtil,
    validUtil,
    dataUtil
}