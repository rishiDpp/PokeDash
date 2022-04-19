
let ID
const form = document.querySelector('#inputBox')
const clearBox = document.querySelector('#clearButton')
const searchButton = document.querySelector('#searchButton')
const nextButton = document.querySelector('#nextButton')
const previousButton = document.querySelector('#previousButton')

const description = document.querySelector('#description')

//print moves
const moveDiv = document.querySelector('#moveList')
const moveSelect = document.querySelector('#moveSelect')
const moveDescriptionDiv = document.querySelector('#moveDescription')
const moveList = document.createElement('select')

const fetchMove = async (moveName) =>
    {
        try {
            const moveStore = await axios.get(`https://pokeapi.co/api/v2/move/${moveName}/`)
            append(moveStore)
        }
        catch {
            console.log('error fetchMove')
        }
    }
function append(moveStore)
{
    let i=-1,j=0
            for (let entry of moveStore.data.flavor_text_entries)
            {
                i++
                if(entry.language.name == 'en')
                    j=i  
            }
            moveDescriptionDiv.innerHTML = ''
            moveDescriptionDiv.append(moveStore.data.flavor_text_entries[j].flavor_text)
}
clearBox.addEventListener('click', function (a)
{
    a.preventDefault()
    form.value=''
})

searchButton.addEventListener('click', async function (a)
{
    a.preventDefault()
    pokedex(form.value)
    // pokedex(form.elements.name.value)

})

previousButton.addEventListener('click', async function (a)
{
    pokedex(ID-1)
})
nextButton.addEventListener('click', async function (a)
{
    pokedex(ID+1)
})



async function pokedex(pokemon)
{
    const pokedexDiv = document.querySelector('#pokedex')
    const fetchData = async () => {
        try {
            const store = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            const chapter = store.data
            ID = chapter.id

            printName(chapter)
            printImage(chapter)
            printType(chapter)
            printHW(chapter)
            printAbilities(chapter)
            printStats(chapter)
            printdescription(ID)
            printEvolution(chapter)
            printMoves(chapter)

            const clearText = document.querySelector('#inputBox')
            clearText.value = ''

            // pokedexDiv.classList.add('border')    

        }
        catch (e) {
            alert('Pokemon not found!!')
        }
    }
    fetchData()


}

function printName(chapter)
{
    const profileName = document.querySelector('#profileName')
    profileName.innerHTML = ''

    const nameTag1 = document.createElement('span')
    const nameTag2 = document.createElement('span')
    nameTag1.classList.add('tag')
    nameTag1.innerHTML = 'ID: '
    profileName.append(nameTag1, `#${chapter.id} `)
    nameTag2.classList.add('tag')
    nameTag2.innerHTML = 'Name: '
    profileName.append(nameTag2, chapter.name.toUpperCase())

}

function printImage(chapter)
{
    const profilePic = document.querySelector('#profilePic')
    const image = document.createElement('img')
    if(chapter['sprites']['other']['dream_world']['front_default'] == null)
        image.src = chapter['sprites']['other']['official-artwork']['front_default']
    else image.src = chapter['sprites']['other']['dream_world']['front_default']
    profilePic.innerHTML = ''
    profilePic.classList.add('border')
    profilePic.append(image)
}

function printType(chapter)
{
    const typeDiv = document.querySelector('#typeList')
    const typeList = document.createElement('span')
    for (let element of chapter.types)
        {
            let type = document.createElement('span')
            type.classList.add('typeBox')
            type.append(element.type.name)
            type.classList.add(element.type.name)
            typeList.append(type)
        }
    typeDiv.innerHTML = ''
    const typeTag = document.createElement('span')
    typeTag.classList.add('tag')
    typeTag.innerHTML = 'Types: '
    typeDiv.append(typeTag,typeList)
    // typeDiv.classList.add('border')
}

function printHW(chapter)
{
    const HWspan = document.querySelector('#HW')
    HWspan.innerHTML=''

    const H = document.createElement('span')
    H.innerHTML = 'Height: '
    H.classList.add('tag')
    HWspan.append(H,(chapter.height/10),' m ')

    const W = document.createElement('span')
    W.innerHTML = 'Weight: '
    W.classList.add('tag')
    HWspan.append(W,(chapter.weight)/10,' kgs')
    // HWspan.classList.add('border')
}

function printAbilities(chapter)
{
    const abilityDiv = document.querySelector('#abilityList')
    const abilityList = document.createElement('span')
    for(let element of chapter.abilities)
    {
        let ability = document.createElement('span')
        ability.classList.add('abilityBox')
        ability.append(element.ability.name)
        abilityList.append(ability)
    }
    const abilityTag = document.createElement('span')
    abilityTag.innerHTML = 'Abilities: ' 
    abilityTag.classList.add('tag')

    abilityDiv.innerHTML=''
    abilityDiv.append(abilityTag, abilityList)
    // abilityDiv.classList.add('border')
    const basicerInfo = document.querySelector('#basicerInfo')
    basicerInfo.classList.add('border')
}

function printStats(chapter)
{
    const statDiv = document.querySelector('#statList')
    statDiv.innerHTML = ''
    const baseStats = document.createElement('h2')
    baseStats.innerText='Base Stats:'
    statDiv.append(baseStats)
    const tableBody = document.createElement('div')
    for(let element of chapter.stats)
    {
        const itemRow = document.createElement('tr')
        const itemName = document.createElement('td')
        const itemData = document.createElement('td')

        const itemBar = document.createElement('td')
            const BGbar = document.createElement('div')
            const bar = document.createElement('div')

        itemName.innerHTML = element.stat.name
        itemName.style.minWidth = '130px';
        itemRow.append(itemName)
        itemData.innerHTML = element.base_stat
        itemData.style.minWidth = '30px'
        itemRow.append(itemData)

        BGbar.style.backgroundColor = 'blue'
        BGbar.style.width = '200px'
        BGbar.classList.add('barRating')

        bar.style.width = `${element.base_stat}px`
        bar.style.backgroundColor = 'yellow'
        bar.classList.add('barRating')
        
        BGbar.append(bar)
        itemBar.append(BGbar)
        itemRow.append(itemBar)
        tableBody.append(itemRow)

        statDiv.append(tableBody)
    }
    // statDiv.classList.add('border')
}

function printdescription(ID)
{
    const fetchDescription = async () => {
        try {
            const speciesStore = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${ID}/`)
            description.innerHTML = ''

            let i=-1,j=0
            for (let entry of speciesStore.data.flavor_text_entries)
            {
                i++
                if(entry.language.name == 'en')
                    j=i  
            }
            description.append(speciesStore.data.flavor_text_entries[j].flavor_text)
            
        }
        catch {
            console.log('error')
        }
    }
    fetchDescription()

}

function printEvolution(chapter)
{
    const fetchEvolution = async () => {
        try {
            const evoDiv = document.querySelector('#evolutions')
            evoDiv.innerHTML = ''
            evoDiv.classList.toggle('border')
            const speciesStore = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${ID}/`)
            const evoChain = await axios.get(speciesStore.data.evolution_chain.url)

            displayEvolution(evoChain.data.chain.species.name, evoDiv)
            for(let pokemon of evoChain.data.chain.evolves_to)
            {
                displayEvolution(pokemon.species.name, evoDiv)
                for(let poke of pokemon.evolves_to)               
                    displayEvolution(poke.species.name, evoDiv)
            }
        }

        catch {
            console.log('error')
        }
    }
    fetchEvolution()
}

function printMoves(chapter)
{
    removeOptions(moveList)

    const defaultOption = document.createElement('option')
    defaultOption.innerHTML = 'Movelist'
    defaultOption.value = ''
    moveList.append(defaultOption)
    for (let element of chapter.moves)
        {
            let move = document.createElement('option')
            move.append(element.move.name)
            moveList.append(move)
        }
    moveSelect.innerHTML = ''
    moveSelect.append(moveList)
    
    moveDiv.classList.add('border')
    
    moveList.addEventListener('change',function (a)
    {
        fetchMove(this.value)
    })
}   

        function removeOptions(moveList) {
            var i, L = moveList.options.length - 1;
            for(i = L; i >= 0; i--) {
            moveList.remove(i);
            }
            moveDescriptionDiv.innerHTML = ''
        }


        
function displayEvolution(name, evoDiv)
{
    const fetchData = async () => 
    {
        try {
            const pokeFaceStore = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const evoButton = document.createElement('button')
            const image = document.createElement('img')

            evoDiv.classList.add('border')
            image.src = pokeFaceStore['data']['sprites']['other']['official-artwork']['front_default']

            evoButton.addEventListener('click', async function (a){
                pokedex(name)
            })
            evoButton.append(image)
            evoDiv.append(evoButton)
        }
        catch {
            console.log('error')
        }
    }
    fetchData()
}

