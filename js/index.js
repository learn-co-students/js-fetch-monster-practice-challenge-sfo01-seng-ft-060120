// For elements that I want global
let n = 1 //this will be used for http pages

const monsterPage = `http://localhost:3000/monsters/?_limit=30&_page=${n}`
const monsterURL = `http://localhost:3000/monsters`
const monsterContainer = document.getElementById('monster-container') //monster container

// forward & back buttons
const forward = document.querySelector('#forward')
const back = document.querySelector('#back')


// GET request monsters
const monsterPages = (n) => {
monsterContainer.innerHTML = ''
fetch(monsterPage)
.then(res => res.json())
.then(json => json.forEach(monster => BuildMonster(monster))) //this is an array, we must user forEach 
}
monsterPages(n)


// BuildMonster
const BuildMonster = (monster) => {
  const monsterCard = document.querySelector('.monster-card') //monster card
  
  monsterCard.innerHTML += `
            <div>
            <h1>${monster.name}</h1>
            <h1>${monster.age}</h1>
            <p>${monster.description}</p>
            </div>
            `
}

// EventListener for create monster button
const listenForCreate = () => {
  const monsterForm = document.querySelector('#monster-form')
  monsterForm.addEventListener('submit', (e) => postNewMonster(e))
// debugger
  // console.log(monsterForm)
}
listenForCreate()

// POST request to 
  const postNewMonster = (e) => {
    // debugger
    e.preventDefault()
    let data = {
      name: e.target[0].value,
      age: e.target[1].value,
      description: e.target[2].value
    }
    // debugger
  fetch(monsterURL, {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => {
    // console.log(json)
    BuildMonster(json)
  })
    }


    // forward & back event listeners

    const navigationBtn = () => {
      back.addEventListener('click', () =>{
        pageForward(false)
      })
      forward.addEventListener('click', () =>{
        pageForward(true)
      })
    }
    navigationBtn()

    const pageForward = (forward) => {
      console.log(forward)
      if(forward) {
      n ++
      monsterPages(n)
    } else {
      if(n === 1){
        alert ('no monsters on this page')
      } else {
        n --
        monsterPages(n)
      }
    }
  }
