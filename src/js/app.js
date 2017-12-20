console.log('js is ready')

const scenes = Array.from(document.querySelectorAll(".scene"))
const slides = Array.from(document.querySelectorAll('section.slide'))
const buttons = Array.from(document.querySelectorAll('.button'))

for (const scene of scenes) {
  const parallaxInstance = new Parallax(scene)
}

let currentSlideIndex = -1

const nextSlide = () => {
  if (currentSlideIndex >= 0) {
    slides[currentSlideIndex].classList.add('fadeout')
  }
  if (currentSlideIndex < slides.length-1) {
    currentSlideIndex++
  }
  slides[currentSlideIndex].classList.add('fadein')
}

const previousSlide = () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--
    slides[currentSlideIndex].classList.add('fadein')
    currentSlideIndex++
    slides[currentSlideIndex].classList.add('fadeout')
  }
}

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    // Left arrow
    case 37:
      previousSlide()
      break
    // Right arrow
    case 39:
      nextSlide()
      break
    // Spacebar
    case 32:
      nextSlide()
      break
  }
})

for (const button of buttons) {
  button.addEventListener('click', nextSlide)
}

nextSlide()

