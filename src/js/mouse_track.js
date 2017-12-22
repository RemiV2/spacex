const mouseTracker = document.querySelector(".mouse-tracker")
const mousePos = { x: 0, y: 0 }
 const trackerPos = { x: 0, y: 0 }

const trackerSettings = {
  width: 20,
  height: 20,
  speed: 0.125
}

const moveTracker = (x, y) => {
  mouseTracker.style.transform = `translate(${x}px, ${y}px)`
}

const loopMouse = () => {
  window.requestAnimationFrame(loopMouse)
  trackerPos.x += (mousePos.x - trackerPos.x) * trackerSettings.speed
  trackerPos.y += (mousePos.y - trackerPos.y) * trackerSettings.speed
  moveTracker(trackerPos.x, trackerPos.y)
}

loopMouse()

let dots = [],
  mouse = {
    x: 0,
    y: 0
  }


let Dot = function() {
  this.x = 0
  this.y = 0
  this.node = (function() {
    let n = document.createElement("div")
    n.className = "trail"
    document.body.appendChild(n)
    return n
  })()
}

Dot.prototype.draw = function() {
  this.node.style.transform = `translate(${this.x}px, ${this.y}px)`
}

for (let i = 0; i < 12; i++) {
  let d = new Dot()
  dots.push(d)
}

const drawMouse = () => {
  let x = mouse.x,
    y = mouse.y

  dots.forEach(function(dot, index, dots) {
    let nextDot = dots[index + 1] || dots[0]

    dot.x = x
    dot.y = y
    dot.draw()
    x += (nextDot.x - dot.x) * 0.6
    y += (nextDot.y - dot.y) * 0.6
  })
}

addEventListener("mousemove", (event) => {
  mouse.x = event.pageX
  mouse.y = event.pageY
})

const animate = () => {
  drawMouse()
  requestAnimationFrame(animate)
}

animate()