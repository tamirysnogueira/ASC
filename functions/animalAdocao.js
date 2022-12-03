import {database, auth} from './database.js';
import { set, ref } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js'
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js'

let image = document.getElementById('arquivo')
let label = document.getElementById('label')
let containerImage = document.getElementById('containerImage')

const submitAdopt = document.getElementById('submitAdopt')

//mudar imagem no html do usuário
image.addEventListener('change', (evt)=> {
    label.remove()

    if (!(evt.target && evt.target.files && evt.target.files.length > 0)) {
        return;
      }

     // Inicia o file-reader:
    var r = new FileReader();
    // Define o que ocorre quando concluir:
    r.onload = function() {
        // Define o `src` do elemento para o resultado:
        
        const imageSrc = document.createElement('img')
        imageSrc.src = r.result;
        imageSrc.id = 'imgFile'

        containerImage.appendChild(imageSrc)
        containerImage.style.display = 'block'
    }
    // Lê o arquivo e cria um link (o resultado vai ser enviado para o onload.
    r.readAsDataURL(evt.target.files[0]);

        

})


//dados do formulario
submitAdopt.addEventListener('click', ()=> {

    let datasAnimal = {
        descriptionLocation: document.getElementById('descriptionLocation').value,
        telForContact: document.getElementById('tel').value,
        description:  document.getElementById('description').value,
        grup: "adopt"
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
              
                set(ref(database, `/users/${user.uid}/datasAnimalAdopt/animal${idAnimal}`), datasAnimal);

                setTimeout(() => {
                    location.reload()
                }, 2000);
              
            } else {
                console.log("erro")
            }
        });
    }
})