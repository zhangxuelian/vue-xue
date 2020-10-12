import Vue from 'vue';

// 工具库
import dateUtil from './util/date_util';
/* import deviceUtil from './util/device_util'; */
import domUtil from './util/dom_util';
import validUtil from './util/valid_util';
import dataUtil from './util/data_util';

// 指令
// import './directive';
import *as directives from './directive/index'

// 使用vue.use()可注入全局
import dialog from './components/dialog';
import keyboard from './components/keyboard';

// 组件
import numberKeyboard from './components/number_keyboard';
import xSwitch from './components/switch';
import xCheckbox from './components/checkbox';
import xRadio from './components/radio';
import xSelect from './components/select';
import xTree from './components/tree';
import xTransfer from './components/transfer';
import xInputNumber from './components/input_number';
import xTabs from './components/tabs';
import xTabPane from './components/tabs/tab_pane';
import xTable from './components/table';
import xPagination from './components/pagination';

const components = [
    numberKeyboard,
    xSwitch,
    xCheckbox,
    xRadio,
    xSelect,
    xTree,
    xTransfer,
    xInputNumber,
    xTabs,
    xTabPane,
    xTable,
    xPagination
];
export default {
    install(vue) {
        vue.prototype.$xdialog = dialog;
        vue.prototype.$xkeyboard = keyboard;
        Object.keys(directives).forEach(k => vue.directive(k, directives[k]))
        components.forEach(component => {
            vue.component(component.name, component);
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