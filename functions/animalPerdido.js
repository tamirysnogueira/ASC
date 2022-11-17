import {database, auth} from './database.js';
import { set, ref } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js'
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js'

let image = document.getElementById('arquivo')
let label = document.getElementById('label')
let containerImage = document.getElementById('containerImage')

const buttonSubmit = document.getElementById('submitLost')

//mudar imagem no html do usuário
image.addEventListener('change', ()=> {
    label.remove()

    let curFiles = image.files;

    for (const key of curFiles) {
        const imageSrc = document.createElement('img');
        imageSrc.src = URL.createObjectURL(key);
        imageSrc.id = 'imgFile'

        containerImage.appendChild(imageSrc)
        containerImage.style.display = 'block'
    }
})


//dados do formulario
buttonSubmit.addEventListener('click', ()=> {
    let datasAnimal = {
        dateLost: document.getElementById('date').value,
        descriptionLocation: document.getElementById('descriptionLocation').value,
        telForContact: document.getElementById('tel').value,
        description:  document.getElementById('description').value
    }

    function verification(){
        for(let data in datasAnimal){
            if(datasAnimal[data] === ''){
                alert('Por favor, preencha todos os campos!')
    
                return false
            }
        }

        return true
    }
    

    if(verification()){
        let imgFile = document.getElementById('imgFile')

        if(imgFile != null) {
            datasAnimal.img = imgFile.src
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                let idAnimal = Math.floor(Math.random() * 10000)
              
                set(ref(database, `/users/${user.uid}/datasAnimalLost/animal${idAnimal}`), datasAnimal);

                setTimeout(() => {
                    location.reload()
                }, 2000);
              
            } else {
                console.log("erro")
            }
        });
    }
})