import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import highlight from 'highlight.js';
import 'highlight.js/styles/stackoverflow-light.css';

require('@/ui/index')

ElementUI.Dialog.props.lockScroll.default = false;
Vue.use(ElementUI);
Vue.use(highlight);
Vue.config.productionTip = false
Vue.directive('draggable', {
  bind(el, binding, vnode) {
    let offsetX = 0, offsetY = 0;
    let dragging = false;
    // eslint-disable-next-line no-unused-vars
    let startX, startY;
    let currentX, currentY;
    let initialX, initialY;
    const onMouseDown = function (event) {
      if (event.button !== 0) return; // only handle left mouse button
      dragging = true;
      initialX = event.clientX - offsetX;
      initialY = event.clientY - offsetY;
      startX = initialX;
      startY = initialY;
    }
    const onMouseMove = function (event) {
      if (dragging) {
        event.preventDefault();
        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;
        offsetX = currentX;
        offsetY = currentY;
        el.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
    }
    const onMouseUp = function () {
      dragging = false;
      offsetX = currentX;
      offsetY = currentY;
    }
    el.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mouseleave', onMouseUp);
  }
})

Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    highlight.highlightBlock(block)
  })
})

new Vue({
  render: h => h(App),
}).$mount('#app')
