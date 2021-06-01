const search = document.querySelector('.search')
const form = document.querySelector('idk')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (search.classList.contains('active')) {
    btn.addEventListener('click', () => {
      if (input.value !== '') {
        window.open(`https://www.google.com/search?q=${input.value}`)
        input.value = ''
      } else {
        return
      }
    })
  }
})
