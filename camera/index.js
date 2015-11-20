const canvas = document.getElementById('canvas').getContext('2d')
const width = canvas.width = Math.min(800, window.innerWidth - 10)
const height = canvas.height = Math.floor(width * (9 / 16))
canvas.fillRect(0, 0, width, height, '#000')
let isReady = false

navigator.getUserMedia({video: {width, height}}, localStream => {
  const video = document.createElement('video')
  video.width = width
  video.height = height
  video.src = window.URL.createObjectURL(localStream)
  window.requestAnimationFrame(() => {
    if (isReady) canvas.drawImage(0, 0, video)
  })
})

const audio = document.getElementById('audio')
audio.addEventListener('canplay', () => {
  isReady = true
})
audio.addEventListener('ended', () => {
  isReady = true
})

const anchor = document.getElementById('download')
canvas.addEventListener('click', () => {
  if (!isReady) return
  isReady = false

  anchor.href = window.URL.createObjectURL(canvas.toBlob())
  anchor.click()

  audio.play()
})
