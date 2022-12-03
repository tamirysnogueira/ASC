import {database, auth} from './database.js';
import { child, get, ref, set } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js'
import { onAuthStateChanged, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider  } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js'

const dbRef = ref(database);

const nameText = document.getElementById('name')
const cpf = document.getElementById('cpf')
const tel = document.getElementById('tel')
const email = document.getElementById('email')
const senha = document.getElementById('senha')

const buttonEdit = document.getElementById('edit')

let dataUser = {}
let uid = ''

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;

    get(child(dbRef, `users/${uid}/dataLogin`)).then((snapshot) => {
        if (snapshot.exists()) {
            dataUser = snapshot.val()

            nameText.value = dataUser.name
            cpf.value = dataUser.cpf
            tel.value = dataUser.tel
            email.value = dataUser.email
            senha.value = dataUser.senha
                
        }
    })

  } else {
    console.log("erro")
  }
});



buttonEdit.addEventListener('click', ()=> {
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        prompt("insira a sua senha atual para mudar os dados:")
    )

    reauthenticateWithCredential(user, credential).then(() => {
        console.log('autenticado')
        setTimeout(() => {
            updateEmail(user, `${email.value}`).then(() => {
                console.log("Email mudado!")
            }).catch((error) => {
                console.log(error)
            });
        }, 1000);
        

        updatePassword(user, `${senha.value}`).then(() => {
            console.log("Senha mudou!")
          }).catch((error) => {
            console.log(error)
          });

        get(child(dbRef, `users/${uid}/dataLogin`)).then((snapshot) => {
            if (snapshot.exists()) {
    
                set(ref(database, `/users/${user.uid}/dataLogin/name`), nameText.value);
                set(ref(database, `/users/${user.uid}/dataLogin/cpf`), cpf.value);
                set(ref(database, `/users/${user.uid}/dataLogin/email`), email.value);
                set(ref(database, `/users/${user.uid}/dataLogin/senha`), senha.value);
                set(ref(database, `/users/${user.uid}/dataLogin/tel`), tel.value);
                    
            }
        })

        setTimeout(() => {
            location.reload()
        }, 2000);
    }).catch((error) => {
        console.log(error)
    });

})