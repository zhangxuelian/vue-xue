import Vue from 'vue';
import dom from '../util/dom_util';
Vue.directive('xImg', {
    inserted: async function (el, binding) {
        let imgURL = binding.value.src;
        let errUrl = binding.value.err || "";
        let exist = await dom.isExistImage(imgURL);
        if (exist) {
            el.setAttribute('src', imgURL);
        } else {
            el.setAttribute('src', errUrl);
        }
    },
    update: async function (el, binding) {
        let imgURL = binding.value.src;
        let errUrl = binding.value.err || "";
        let exist = await dom.isExistImage(imgURL);
        if (exist) {
            el.setAttribute('src', imgURL);
        } else {
            el.setAttribute('src', errUrl);
        }
    }
});
Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        // here I check that click was outside the el and his children
        if (!(el == event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          if(binding.expression){
            vnode.context[binding.expression](event);
          }
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
  });