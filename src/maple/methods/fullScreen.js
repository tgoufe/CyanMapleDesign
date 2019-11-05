import _ from 'lodash'
function enterFullScreen(element = document.documentElement) {
  for (let methodName of [
    'requestFullscreen',
    'mozRequestFullScreen',
    'msRequestFullscreen',
    'webkitRequestFullscreen'
  ]) {
    if (element[methodName]) {
      element[methodName]()
      break
    }
  }
}
function exitFullScreen() {
  for (let methodName of [
    'exitFullscreen',
    'msExitFullscreen',
    'mozCancelFullScreen',
    'webkitExitFullscreen'
  ]) {
    if (document[methodName]) {
      document[methodName]()
      break
    }
  }
}
export default function fullScreen(element = document.documentElement) {
  if (_.isBoolean(element)) {
    element ? enterFullScreen() : exitFullScreen()
  } else if (_.isElement(element)) {
    enterFullScreen(element)
  }
}
