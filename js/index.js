let pageNumber = 1

document.addEventListener("DOMContentLoaded", () => {
    fetchAllMonsters(pageNumber)
    newMonsterForm()

    // const forwardButton = document.querySelector('#forward')
    // forwardButton.addEventListener('click', (e) => moveForward(e))

    const backwardButton = document.querySelector('#back')
    backwardButton.addEventListener('click', (e) => moveBackward(e))

})

const fetchAllMonsters = (pageNumber) => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(res => res.json())
    .then(json => json.forEach(monster => showAllMonsters(monster)))
}

const newMonsterForm = () => {
    let createMonster = document.querySelector('#create-monster')
    let formDiv = document.createElement('div')
    
	formDiv.innerHTML = `
        <h3>Create a New Monster:</h3>
        <form id='new-monster-form'>
        <input id='name' placeholder='name...'>
        <input id='age' placeholder='age...'>
        <input id='description' placeholder='description...'>
        <input type='submit' value='submit'>
        </form>
    `

    createMonster.appendChild(formDiv)
    
	formDiv.addEventListener('submit', (e) => {
        e.preventDefault()
        createNewMonster(e)

})
}

const showAllMonsters = (monster) => {
    let monsterContainer = document.querySelector('#monster-container')

    let div = document.createElement('div')
    div.id = monster.id
    div.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
    `

    const editButton = document.createElement('button')
    editButton.innerHTML = "EDIT"
    editButton.addEventListener('click', (e) => editMonster(e, monster))

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "DELETE"
    deleteButton.addEventListener('click', (e) => deleteMonster(e, monster))

    div.appendChild(deleteButton)

    monsterContainer.appendChild(div)
}

const createNewMonster = (e) => {

    let data = {
        name: e.target[0].value,
        age: e.target[1].value,
        description: e.target[2].value, 
    }

    fetch('http://localhost:3000/monsters/', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
        let createMonster = document.querySelector('#create-monster')
        createMonster.innerHTML = ''
        newMonsterForm()
    })
}

const deleteMonster = (e, monster) => {
    fetch(`http://localhost:3000/monsters/${monster.id}`, {
        method:'DELETE'
    })
    .then(res => res.json)
    .then (json => {
        let currentDiv = document.getElementById(monster.id)
        currentDiv.innerHTML = ''
    })
}

const moveForward = (e) => {
    pageNumber += 1
    let monsterContainer = document.querySelector('#monster-container')
    monsterContainer.innerHTML = ''
    fetchAllMonsters(pageNumber)
}

const moveBackward = (e) => {
    pageNumber -= 1
    let monsterContainer = document.querySelector('#monster-container')
    monsterContainer.innerHTML = ''
    fetchAllMonsters(pageNumber)
}