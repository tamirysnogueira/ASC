import { ref, child, get, set } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js'
import {database, auth} from './database.js';

const containerAnimals = document.querySelector('.animal')

let arrayAnimals = new Array

const dbRef = ref(database);

await get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
        let datas = snapshot.val()
            
        for (const user in datas) {
            let userDatas = datas[user]

            if(userDatas.datasAnimalLost != undefined){
                arrayAnimals.push(userDatas.datasAnimalLost)
            }

            if(userDatas.datasAnimalAdopt != undefined){
                arrayAnimals.push(userDatas.datasAnimalAdopt)
            }

        }
            
    }
})

console.log(arrayAnimals)

if(arrayAnimals.length === 0){
    document.body.innerHTML += "<h2> Ainda não há nenhum animal cadastrado! </h3>"


} else {
    for(const animals of arrayAnimals){
        for(const dataAnimals in animals){
            let allDataAanimals= animals[dataAnimals]
            
    
            if(allDataAanimals.dateLost != undefined){
                containerAnimals.innerHTML += `
                    <div> 
                        <img src="${allDataAanimals.img}" alt="">
                        <h2>Animal perdido!</h2>
                        <p>Data em que foi visto: ${allDataAanimals.dateLost}</p>
                        <p>${allDataAanimals.description}</p>
                        <p>Telefone para contato: ${allDataAanimals.telForContact}</p>
                    </div> 
                
                ` 
            } else {
                containerAnimals.innerHTML += `
                    <div> 
                        <img src="${allDataAanimals.img}" alt="">
                        <h2>Animal para adoção!</h2>
                        <p>Descrição: ${allDataAanimals.description}</p>
                        <p>Telefone para contato: ${allDataAanimals.telForContact}</p>
                    </div> 
                
                `
            }
    
        }
    
    }
}





