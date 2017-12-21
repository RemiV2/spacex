const scenes = Array.from(document.querySelectorAll(".scene"))
const slides = Array.from(document.querySelectorAll('section.slide'))
const buttons = Array.from(document.querySelectorAll('.button'))
const equipmentGraphics = document.querySelector('.equipment .graphics')
const glass = equipmentGraphics.querySelector('.glass')
const suit = equipmentGraphics.querySelector('.suit')
const equipmentDarkFilter = equipmentGraphics.querySelector('.dark-filter')
const equipmentInfo = document.querySelector('.equipment .info')
const outside = document.querySelector('section.outside .background')
const outsideDarkFilter = document.querySelector('section.outside .dark-filter')
const outsideInfo = document.querySelector('section.outside .info')
const outsideRocket = document.querySelector('section.outside .rocket')
const insideDarkFilter = document.querySelector('section.inside .dark-filter')
const insideInfo = document.querySelector('section.inside .info')
const parallaxInstances = []

for (let i=0; i<scenes.length; i++) {
  parallaxInstances[i] = new Parallax(scenes[i])
  if (i>0) {
    parallaxInstances[i].disable()
  }
}

let currentSlideIndex = 0

const nextSlide = () => {
  if (currentSlideIndex == 4) {
    showInfos()
  } else {
    if (currentSlideIndex >= 0) {
      slides[currentSlideIndex].classList.remove("fadein")
      slides[currentSlideIndex].classList.add("fadeout")
      parallaxInstances[currentSlideIndex].disable()
    }
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++
    }
    slides[currentSlideIndex].classList.add("fadein")
    parallaxInstances[currentSlideIndex].enable()
    // Open suit protection
    if (currentSlideIndex == 2) {
      getSuit()
    } else if (currentSlideIndex == 3) {
      showRocket()
    }
  }
}

const previousSlide = () => {
  if (currentSlideIndex == 2) {
    removeSuit()
  } else if (currentSlideIndex == 3) {
    hideRocket()
  }
  if (currentSlideIndex > 0) {
    slides[currentSlideIndex].classList.remove('fadein')
    slides[currentSlideIndex].classList.add('fadeout')
    parallaxInstances[currentSlideIndex].disable()
    currentSlideIndex--
    slides[currentSlideIndex].classList.remove('fadeout')
    slides[currentSlideIndex].classList.add('fadein')
    parallaxInstances[currentSlideIndex].enable()
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
    equipmentDarkFilter.classList.add('visible')
  }, 5000)
}

const removeSuit = () => {
  glass.classList.remove("reveal")
  suit.classList.remove("expand")
  equipmentGraphics.classList.remove('travel')
  equipmentInfo.classList.remove('reveal')
  equipmentDarkFilter.classList.remove("visible")
}

const showRocket = () => {
  outside.classList.add('move')
  window.setTimeout(() => {
    outsideDarkFilter.classList.add('visible')
  }, 9000)
  window.setTimeout(() => {
    outsideInfo.classList.add('visible')
    outsideRocket.classList.add('reveal')
  }, 10000)
  window.setTimeout(() => {
    outsideRocket.classList.add("splice")
  }, 11000)
}

const hideRocket = () => {
  outside.classList.remove("move")
  outsideDarkFilter.classList.remove("visible")
  outsideInfo.classList.remove("visible")
  outsideRocket.classList.remove("reveal")
  outsideRocket.classList.remove("splice")
}

const showInfos = () => {
  insideDarkFilter.classList.add('visible')
  insideInfo.classList.add('visible')
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