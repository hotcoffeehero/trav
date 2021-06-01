const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', queue_box)

queue_box()

function queue_box() {
  const trigger_div = (window.innerHeight / 5) * 4

  boxes.forEach((box) => {
    let boxTop = box.getBoundingClientRect().top

    if (boxTop < trigger_div) {
      box.classList.add('show')
    } else {
      box.classList.remove('show')
    }
  })
}
