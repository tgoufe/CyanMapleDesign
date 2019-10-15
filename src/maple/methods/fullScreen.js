function enterFullScreen(element = document.documentElement) {
  for (let methodName of [
    'requestFullscreen',
    'mozRequestFullScreen',
    'msRequestFullscreen',
    'webkitRequestFullscreen'
  ]) {
    if (element[methodName]) {
      enterFullScreen = function(element = document.documentElement) {
        element[methodName]()
      }
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
      exitFullScreen = function() {
        document[methodName]()
      }
      break
    }
  }
}
if (window && document) {
  enterFullScreen()
  exitFullScreen()
}
export default function fullScreen(element = document.documentElement) {
  if (element === false) {
    exitFullScreen()
  } else {
    enterFullScreen(element)
  }
}
