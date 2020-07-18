// list of monsters
let monsterPageNumber = 1
const monsterContainer = document.getElementById('monster-container')

const fetchAllMonsters = (page) => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(json => json.forEach(item => buildMonsterDiv(item)))
}

const buildMonsterDiv = (monster) => {
    let div = document.createElement('div')
    div.id = monster.id

    let h2 = document.createElement('h2')
    h2.textContent = monster.name

    let h4 = document.createElement('h4')
    h4.textContent = `Age: ${monster.age}`

    let p = document.createElement('p')
    p.textContent = `Bio: ${monster.description}`

    // div.innerHTML = `
    //     <h2>${monster.name}</h2>
    //     <h4>Age: ${monster.age}</h4>
    //     <p>Bio: ${monster.description}</p>
    // `

    div.appendChild(h2)
    div.appendChild(h4)
    div.appendChild(p)
    monsterContainer.appendChild(div)
}

// page change
const forwardButton = document.getElementById('forward')
const backButton = document.getElementById('back')

forwardButton.addEventListener('click', () => {
    monsterPageNumber += 1
    monsterContainer.textContent = ""
    fetchAllMonsters(monsterPageNumber)
})

backButton.addEventListener('click', () => {
    monsterPageNumber -= 1
    monsterContainer.textContent = ""
    fetchAllMonsters(monsterPageNumber)
})

// create monster form
const buildMonsterForm = () => {
    const createMonsterContainer = document.getElementById('create-monster')
    const form = document.createElement('form')
    form.id = 'create-monster-form'

    const nameInput = document.createElement('input')
    nameInput.id = 'name'
    nameInput.placeholder = 'name...'
    
    const ageInput = document.createElement('input')
    ageInput.id = 'age'
    ageInput.placeholder = 'age...'

    const descriptionInput = document.createElement('input')
    descriptionInput.id = 'description'
    descriptionInput.placeholder = 'description...'

    const submitInput = document.createElement('button')
    submitInput.type = 'submit'
    submitInput.innerText = 'Create Monster'

    form.addEventListener('submit', (e) => addNewMonster(e))

    form.appendChild(nameInput)
    form.appendChild(ageInput)
    form.appendChild(descriptionInput)
    form.appendChild(submitInput)
    createMonsterContainer.appendChild(form)
}

const addNewMonster = (e) => {
    e.preventDefault()

    let data = {
        name: e.target[0].value,
        age: e.target[1].value,
        description: e.target[2].value
    }

    configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('http://localhost:3000/monsters', configObj)
    .then(res => res.json())
    .then(json => alert('Monster has been created!'))
    .catch(error => alert('Error!'))

    const form = document.getElementById('create-monster-form')
    form.reset()
}

// function calls
fetchAllMonsters(monsterPageNumber)
buildMonsterForm()