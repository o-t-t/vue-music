// 如果已经存在class类名，则无需再添加
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 添加class类名
export function addClass(el, className) {
  console.log(hasClass(el, className))
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join('')
}
