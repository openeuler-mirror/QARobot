export function debounce(fn, delay = 500) {
  let timer = 0

  return function () {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
