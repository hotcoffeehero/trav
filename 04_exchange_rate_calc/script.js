const currency_el_one = document.getElementById('currency-one')
const amount_el_one = document.getElementById('amount-one')

const currency_el_two = document.getElementById('currency-two')
const amount_el_two = document.getElementById('amount-two')

const rate_el = document.getElementById('rate')
const swap = document.getElementById('swap')

//Get rates and update the DOM

// open source api from ECB: fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
function calculate() {
  const currency_one = currency_el_one.value
  const currency_two = currency_el_two.value

  fetch(
    `https://v6.exchangerate-api.com/v6/3d8309f515e9cef8a79fb2a6/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      const rate = data.conversion_rates[currency_two]
      console.log(rate)
      //This just shows a simple 1-1 conversion of the two currencies
      rate_el.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
      amount_el_two.value = (amount_el_one.value * rate).toFixed(2)
    })
}

//Event Listeners
currency_el_one.addEventListener('change', calculate)
amount_el_one.addEventListener('input', calculate)
currency_el_two.addEventListener('change', calculate)
amount_el_two.addEventListener('input', calculate)

swap.addEventListener('click', () => {
  const temp = currency_el_one.value
  currency_el_one.value = currency_el_two.value
  currency_el_two.value = temp
  calculate()
})

calculate()

//my api key link: https://app.exchangerate-api.com/dashboard
//password:
