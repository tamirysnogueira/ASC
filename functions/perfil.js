import {database, auth} from './database.js';
import { child, get, ref } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js'
import { onAuthStateChanged, signOut  } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js'

const dbRef = ref(database);

const nameText = document.getElementById('nameTitulo')
const buttonLogout = document.getElementById('img')

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

    get(child(dbRef, `users/${uid}/dataLogin`)).then((snapshot) => {
        if (snapshot.exists()) {
            const dataUser = snapshot.val()

            nameText.innerHTML = `Boas vindas, ${dataUser.name}!`
                
        }
    })

  } else {
    console.log("erro")
  }
});

buttonLogout.addEventListener('click', ()=> {
    let confirmLogout = confirm("Tem certeza que deseja sair? Você irá deslogar!")

    if(confirmLogout){
        signOut(auth).then(() => {

            window.location.href = '../../index.html'
            
          }).catch((error) => {

            console.log(error)
            
          });
    }
})



