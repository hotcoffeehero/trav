const left = document.querySelector('.left')
const right = document.querySelector('.right')
const big_box = document.querySelector('.big_box')

left.addEventListener('mouseenter', () => {
  big_box.classList.add('hover-left')
})
left.addEventListener('mouseleave', () => {
  big_box.classList.remove('hover-left')
})

right.addEventListener('mouseenter', () => big_box.classList.add('hover-right'))
right.addEventListener('mouseleave', () =>
  big_box.classList.remove('hover-right')
)
