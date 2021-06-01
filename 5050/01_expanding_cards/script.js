const panels = document.querySelectorAll('.panel')

panels.forEach((panel) => {
  panel.addEventListener('click', () => {
    remove_active_classes()
    panel.classList.add('active')
  })
})

let remove_active_classes = () => {
  panels.forEach((panel) => {
    panel.classList.remove('active')
  })
}
