import * as Vue from 'vue'
import App from './App.vue'
import highlight from 'highlight.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/index.css'
import Vant from 'vant'
import '../node_modules/vant/lib/index.css'
import 'highlight.js/styles/atom-one-dark.css' // 黑色主题，会好看一点

window.$vueApp = Vue.createApp(App)
window.$vueApp.use(Vant)
window.$vueApp.use(ElementPlus)
window.$vueApp.use(highlight)
window.$vueApp.directive('draggable', {
  beforeMount(el, binding, vnode) {
    let offsetX = 0,
      offsetY = 0
    let dragging = false
    // eslint-disable-next-line no-unused-vars
    let startX, startY
    let currentX, currentY
    let initialX, initialY
    const onMouseDown = function (event) {
      if (event.button !== 0) return // only handle left mouse button
      dragging = true
      initialX = event.clientX - offsetX
      initialY = event.clientY - offsetY
      startX = initialX
      startY = initialY
    }
    const onMouseMove = function (event) {
      if (dragging) {
        event.preventDefault()
        currentX = event.clientX - initialX
        currentY = event.clientY - initialY
        offsetX = currentX
        offsetY = currentY
        el.style.transform = `translate(${currentX}px, ${currentY}px)`
      }
    }
    const onMouseUp = function () {
      dragging = false
      offsetX = currentX
      offsetY = currentY
    }
    el.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mouseleave', onMouseUp)
  },
})

window.$vueApp.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    highlight.highlightBlock(block)
  })
})

window.$vueApp.mount('#app')
window.$vueApp.config.globalProperties.routerAppend = (path, pathToAppend) => {
  return path + (path.endsWith('/') ? '' : '/') + pathToAppend
}
