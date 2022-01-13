document.addEventListener('DOMContentLoaded', () => {
  
})
function dogList(dog){
    const row = document.createElement('tr')
    let dogName = document.createElement('td')
    let dogBreed = document.createElement('td')
    let dogSex = document.createElement('td')
    let edit = document.createElement('td')
    let btn = document.createElement('button')
    dogName.textContent = dog.name
    dogBreed.textContent = dog.breed
    dogSex.textContent = dog.sex
    btn.textContent = 'Edit'
    btn.addEventListener('click', event =>{
        let form = document.querySelectorAll('#dog-form input')
        form[0].value = event.path[2].cells[0].innerText
        form[1].value = event.path[2].cells[1].innerText
        form[2].value = event.path[2].cells[2].innerText
        document.querySelector('#dog-form').addEventListener('submit',info => {
            info.preventDefault()
            event.path[2].cells[0].innerText = info.target[0].value
            event.path[2].cells[1].innerText = info.target[1].value
            event.path[2].cells[2].innerText = info.target[2].value
    
        }) 
    })
   
    edit.appendChild(btn)
    row.append(dogName, dogBreed, dogSex, edit)
    document.querySelector('#table-body').appendChild(row)
}
function patchDogs(dog){
    fetch(`http://localhost:3000/dogs/${dog.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
    })
    .then(resp => resp.json())
    .then(newDog => console.log(newDog))
}
function renderDogs(){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(dogList))
}
renderDogs()
