const canvas = document.querySelector('.stars-bg')
const ctx = canvas.getContext('2d')
const centerPoint = {}
let stars = []
let frameCount = 0


const resize = () => {
  // Resize canvas
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  centerPoint.x = canvas.width / 2,
  centerPoint.y = canvas.height / 2

  // Reset canvas content
  clear()
  stars = []
  for (let i=0; i<400; i++) {
    createStar()
  }
}

const createStar = () => {
  const star = {}
  star.x = canvas.width * Math.random()
  star.y = canvas.height * Math.random()
  star.distance = getDistance(star.x, star.y, centerPoint.x, centerPoint.y)
  star.random = Math.random()
  // Get angle between star and canvas center
  star.angle = Math.atan2(star.y - centerPoint.y, star.x - centerPoint.x)
  star.color = "#FFFDE7"
  star.radius = star.random * star.distance / 500
  star.speed = Math.random() * 0.7

  stars.push(star)
}

const moveStars = () => {
  let i = 0
  for (const star of stars) {
    star.x += Math.cos(star.angle) * star.speed
    star.y += Math.sin(star.angle) * star.speed
    if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
      // Delete elements out of canvas
      stars.splice(i, 1)
    }
    // Increase stars size when they get closer
    star.distance = getDistance(star.x, star.y, centerPoint.x, centerPoint.y)
    star.radius = star.random * star.distance / 500
    i++
  }
}


const draw = () => {
  for (const star of stars) {
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    ctx.fillStyle = star.color
    ctx.fill()
  }
}

const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const loop = () => {
  frameCount++
  requestAnimationFrame(loop)

  // Create star every 20 frames
  if (frameCount % 20 == 0) {
    createStar()
  }
  moveStars()
  clear()
  draw()
}

const getDistance = (x0, y0, x1, y1) => {
  // Using Pythagore
  const differenceX = x0 - x1
  const differenceY = y0 - y1
  return Math.sqrt(Math.pow(differenceX, 2) + Math.pow(differenceY, 2))
}

resize()
loop()

window.addEventListener('resize', resize)