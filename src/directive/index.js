import Vue from 'vue';
import dom from '../util/dom';
Vue.directive('xImg', {
    inserted: async function (el, binding) {
        let imgURL = binding.value;
        if (imgURL) {
            let exist = await dom.isExistImage(imgURL);
            if (exist) {
                el.setAttribute('src', imgURL);
            }
        }
    }
});