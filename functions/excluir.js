import {database, auth} from './database.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js'
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser, onAuthStateChanged   } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js'

const dbRef = ref(database);

const buttonExluir = document.getElementById('excluir')

buttonExluir.addEventListener('click', ()=> {
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        prompt("insira a sua senha atual para mudar excluir a sua conta:")
    )

    onAuthStateChanged(auth, (user) => {
        if (user) {
      
          set(ref(database, `/users/${user.uid}`), null);
      
        } else {
          console.log("erro")
        }
    });

    reauthenticateWithCredential(user, credential).then(() => {
        deleteUser(user).then(() => {
            console.log("deletado")

          }).catch((error) => {
            console.log(error)
          });

        
    }).catch((error) => {
        console.log(error)
    });

    setTimeout(() => {
        location.href = '../../index.html'
    }, 2000);

})