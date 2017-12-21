console.log('js is ready')

const scenes = Array.from(document.querySelectorAll(".scene"))
const slides = Array.from(document.querySelectorAll('section.slide'))
const buttons = Array.from(document.querySelectorAll('.button'))
const equipmentGraphics = document.querySelector('.equipment .graphics')
const glass = equipmentGraphics.querySelector('.glass')
const suit = equipmentGraphics.querySelector('.suit')
const darkFilter = equipmentGraphics.querySelector('.dark-filter')
const equipmentInfo = document.querySelector('.equipment .info')

console.log(glass)

for (const scene of scenes) {
  const parallaxInstance = new Parallax(scene)
}

let currentSlideIndex = 0

const nextSlide = () => {
  console.log('next')
  if (currentSlideIndex >= 0) {
    slides[currentSlideIndex].classList.remove('fadein')
    slides[currentSlideIndex].classList.add('fadeout')
  }
  if (currentSlideIndex < slides.length-1) {
    currentSlideIndex++
  }
  slides[currentSlideIndex].classList.add('fadein')
  // Open suit protection
  if (currentSlideIndex == 2) {
    getSuit()
  }
}

const previousSlide = () => {
  if (currentSlideIndex == 2) {
    removeSuit()
  }
  if (currentSlideIndex > 0) {
    console.log('back')
    slides[currentSlideIndex].classList.remove('fadein')
    slides[currentSlideIndex].classList.add('fadeout')
    currentSlideIndex--
    slides[currentSlideIndex].classList.remove('fadeout')
    slides[currentSlideIndex].classList.add('fadein')
  }
}

const getSuit = () => {
  window.setTimeout(() => {
    glass.classList.add("reveal")
  }, 2000)
  window.setTimeout(() => {
    suit.classList.add("expand")
  }, 4000)
  window.setTimeout(() => {
    equipmentGraphics.classList.add('travel')
    equipmentInfo.classList.add('reveal')
    darkFilter.classList.add('visible')
  }, 5000)
}

const removeSuit = () => {
  glass.classList.remove("reveal")
  suit.classList.remove("expand")
  equipmentGraphics.classList.remove('travel')
  equipmentInfo.classList.remove('reveal')
  darkFilter.classList.remove("visible")
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

