import { signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js'
import { auth } from './database.js';

const inputLogin = document.getElementById('loginUser')
const password = document.getElementById('password')
const makeLogin = document.getElementById('makeLogin')

makeLogin.addEventListener('click', ()=> {
    if(password.value === '' || inputLogin.value === ''){
        alert("Por favor, preencha todos os campos!")
    
    
    } else {
        signInWithEmailAndPassword(auth, inputLogin.value, password.value)
        .then((userCredential) => {
            window.location.href = 'usuario/perfil.html'
        })
        .catch((error) => {
            const errorCode = error.code;

            if(errorCode === 'auth/wrong-password'){
                alert('A senha está incorreta, tente novamente!')

            } 

            if(errorCode === 'auth/user-not-found'){
                alert('Não há usuário com esse e-mail, tente novamente!')
            }
        });
    }
})




