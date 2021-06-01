const main = document.getElementById('main')
const add_user_btn = document.getElementById('add-user')
const double_btn = document.getElementById('double')
const show_mllnrs_btn = document.getElementById('show-millionaires')
const sort_btn = document.getElementById('sort')
const calc_wealth_btn = document.getElementById('calculate-wealth')

let data = []

//Fetch a random user and add money

let get_ran_user = async () => {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()

  const user = data.results[0]

  const new_user = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  }
  //   console.log(new_user)
  //   console.log(data)

  add_data(new_user)
}

//Double everyone's Money
let double_money = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }
  })
  update_DOM()
}

//Sort by richest
let sort_by_richest = () => {
  data.sort((a, b) => b.money - a.money)
  update_DOM()
}

//Filter millionaires only....
let show_millionaires = () => {
  data = data.filter((user) => user.money > 1000000)
  update_DOM()
}

//Show everybody's wealth
let calculate_wealth = () => {
  const dat_paper = data.reduce((acc, user) => (acc += user.money), 0)

  const dat_paper_EL = document.createElement('div')
  dat_paper_EL.innerHTML = `<h3>Total Wealth: <strong>${format_money(
    dat_paper
  )}</strong></h3>`
  main.appendChild(dat_paper_EL)
}

//Add new object to the data array
let add_data = async (obj) => {
  data.push(obj)

  update_DOM()
}

// Update DOM with new random data
let update_DOM = (provided_data = data) => {
  //clear what's in the main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
  provided_data.forEach((item) => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong>${format_money(
      item.money
    )}`
    main.appendChild(element)
  })
}

//Format the number as money
let format_money = (number) => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

//Event listeners

add_user_btn.addEventListener('click', get_ran_user)

double_btn.addEventListener('click', double_money)

sort_btn.addEventListener('click', sort_by_richest)

show_mllnrs_btn.addEventListener('click', show_millionaires)

calc_wealth_btn.addEventListener('click', calculate_wealth)

// Populates the page with info

get_ran_user()
get_ran_user()
get_ran_user()
