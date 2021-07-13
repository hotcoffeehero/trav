const smallCups = document.querySelectorAll('cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

smallCups.forEach((cup, index) => {
  cup.addEventListener('click', () => highlightCups(index))
})

function highlightCups(index) {
  if (
    smallCups[index].classList.contains('full') &&
    !smallCups[index].nextElementSibling.classList.contains('full')
  ) {
    index--
  }

  smallCups.forEach((cup, indx2) => {
    if (indx2 <= index) {
      cup.classList.add('full')
    } else {
      cup.classList.remove('full')
    }
  })
}
