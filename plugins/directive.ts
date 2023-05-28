export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", {
    beforeMount: (el, binding) => {
      el.clickOutsideEvent = (event: Event) => {
        if (!(el == event.target || el.contains(event.target))) {
          binding.value();
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    getSSRProps(_binding, _vnode) {
      return {};
    },
  });
});
