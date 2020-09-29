import dom from '@/util/dom_util';
export default {
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
}