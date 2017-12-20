console.log('js is ready')

const scene = document.querySelector(".scene")
const parallaxInstance = new Parallax(scene)
const slides = Array.from(document.querySelectorAll('section.slide'))
const buttons = Array.from(document.querySelectorAll('.button'))

console.log(slides)
console.log(buttons)

let currentSlideIndex = 0

const nextSlide = () => {
  for (const slide of slides) {
    slide.style.zIndex = '0'
  }
  slides[currentSlideIndex].style.zIndex = '100'
  currentSlideIndex++
}

for (const button of buttons) {
  button.addEventListener('click', nextSlide)
}

nextSlide()

