const loading_text = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let loading = 0

let blur_effect = () => {
  loading++
  if (loading > 99) {
    clearInterval(int)
  }
  console.log(loading)
  loading_text.innerText = `${loading}%`
  loading_text.style.opacity = scale(loading, 0, 100, 1, 0)
  bg.style.filter = `blur(${scale(loading, 0, 100, 30, 0)}px)`
}

let scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

let int = setInterval(blur_effect, 30)
