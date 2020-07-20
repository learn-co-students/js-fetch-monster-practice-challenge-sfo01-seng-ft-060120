let currentPage = 0

const loadForm = () => {
    let div = document.getElementById('create-monster')
    div.innerHTML = `
    <form id='monster-form'>
        <input id='name' placeholder='name...'>
        <input id='age' placeholder='age...'>
        <input id='description' placeholder='description...'>
        <input type='submit' value='submit'>
    </form>
    `
    let form = document.getElementById('monster-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        createMonster(e)
    })
}

const getAllMonsters = (currentPageValue) => {
    loadForm()
    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(json => {
        
        currentPageValue*50 > json.length - 1 ? currentPage -= 1 : currentPage
        currentPageValue < 0 ? currentPage = 0 : currentPage

        console.log(currentPage)

        for(let i = currentPage*50; i < (currentPage+1)*50; i++){
            renderMonster(json[i])
        }
    })
    //json.forEach(monster => renderMonster(monster)))
}

getAllMonsters(currentPage)

const createMonster = (e) => {
    
    let data = {
        name: e.target[0].value, 
        age: e.target[1].value, 
        description: e.target[2].value
    }

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => renderMonster(json))


    let form = document.getElementById('monster-form')
    form.reset()
}


const renderMonster = (monster) => {
    let main = document.getElementById('monster-container')
    let div = document.createElement('div')
    div.className = 'monster'

    let h2 = document.createElement('h2')
    h2.innerText = monster.name
    div.appendChild(h2)

    let h5 = document.createElement('h5')
    h5.innerText = `Age: ${monster.age}`
    div.appendChild(h5)

    let p = document.createElement('p')
    p.innerText = monster.description
    div.appendChild(p)

    main.appendChild(div)
}

// adjust view
const renderPageButtons = () => {
    let back = document.getElementById('back')
    let forward = document.getElementById('forward')

    back.addEventListener('click', (e) => {
        currentPage -= 1
        let main = document.getElementById('monster-container')
        main.innerHTML = ''

        console.log(currentPage)
        getAllMonsters(currentPage)
    })

    forward.addEventListener('click', (e) => {
        currentPage += 1
        let main = document.getElementById('monster-container')
        main.innerHTML = ''

        console.log(currentPage)
        getAllMonsters(currentPage)
    })

}

renderPageButtons()