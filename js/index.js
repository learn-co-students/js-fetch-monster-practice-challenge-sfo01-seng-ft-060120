// For elements that I want global
const monsterPage = 'http://localhost:3000/monsters/?_limit=30&_page=1'
const monsterURL = `http://localhost:3000/monsters`


// GET request monsters
fetch(monsterPage)
.then(res => res.json())
.then(json => json.forEach(monster => BuildMonster(monster))) //this is an array, we must user forEach 

// BuildMonster
const BuildMonster = (monster) => {
  // const monsterContainer = document.getElementById('monster-container') //monster container
  const monsterCard = document.querySelector('.monster-card') //monster card
  
  monsterCard.innerHTML += `
            <div>
            <h1>${monster.name}</h1>
            <h1>${monster.age}</h1>
            <p>${monster.description}</p>
            </div>
            `

//   const monsterName = document.createElement('h3')
//   monsterName.innerText = `${monster.name}`
//   monsterName.id = `${monster.id}`
//   const monsterAge = document.createElement('h6')
//   monsterAge.innerText = `${monster.age}`

//  const monsterDescription = document.createElement('p')
//   monsterDescription.innerText = `${monster.description}`

// append here
// monsterContainer.appendChild(monsterCard)
// monsterCard.appendChild(monsterName)
// monsterName.appendChild(monsterAge)
// monsterAge.appendChild(monsterDescription)

listenForCreate()

}

// EventListener for create monster button
const listenForCreate = () => {
  const monsterForm = document.querySelector('#monster-form')
  monsterForm.addEventListener('submit', (e) => postNewMonster(e))
// debugger
  // console.log(monsterForm)
}

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
  .then(json => {console.log(json)
    BuildMonster(json)
  })
  // debugger
    }
// // console.log(data)

