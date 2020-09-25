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
    xTabPane
];

export default {
    install(vue) {
        vue.prototype.$xdialog = dialog;
        vue.prototype.$xkeyboard = keyboard;
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