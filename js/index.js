fetch('http://localhost:3000/monsters')
.then(function(response){
    return response.json()
})
.then(function(json){
    renderMonsters(json)
    //console.log(json[0])
})

function renderMonsters(monsters){
    let container = document.getElementById('monster-container')
    
    monsters.forEach( monster => {
        let div = document.createElement('div')
        div.innerHTML = `<div>
            <ul>
                <li>Name: ${monster.name}</li>
                <li>Age: ${monster.age}</li>
                <li>Description: ${monster.description}</li>
            </ul>
        </div>`
        
        container.appendChild(div)
    })
}

function newMonster(e){
    e.preventDefault()
    let data = {name: e.target.name.value, age:e.target.age.value, description: e.target.description.value};

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById('monster-container')
            let div = document.createElement('div')
            div.innerHTML = `<div>
                <ul>
                    <li>Name: ${data.name}</li>
                    <li>Age: ${data.age}</li>
                    <li>Description: ${data.description}</li>
                </ul>
            </div>`
            
            container.appendChild(div)
    })
}

document.addEventListener('submit', (e) => newMonster(e))