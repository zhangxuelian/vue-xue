import dialog from './dialog';
import keyboard from './keyboard';
import numberKeyboard from './number_keyboard';
import xswitch from './switch';
import './directive';
import Vue from 'vue';
Vue.component('x-number-keyboard', numberKeyboard);
Vue.component('x-switch', xswitch);
export default {
    install(vue) {
        vue.prototype.$xdialog = dialog;
        vue.prototype.$xkeyboard = keyboard;
    }
}