import { ref, child, get, set } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js'
import {database, auth} from './database.js';

const buttonLogin = document.getElementById('cadastro');

let arrayDataCpf = new Array
let arrayDataEmail = new Array

const dbRef = ref(database);

get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
        let datas = snapshot.val()
            
        for (const user in datas) {
            let userDatas = datas[user]

            arrayDataCpf.push(userDatas.dataLogin.cpf)
            arrayDataEmail.push(userDatas.dataLogin.email)
        }
            
    }
})

buttonLogin.addEventListener('click', ()=> {

    let dataUser = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cpf').value,
        tel: document.getElementById('tel').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('password').value
    
    }

    function verification(){
        for (const key in dataUser) {
            if(dataUser[key] === ''){
                alert("Atenção! Informe todos os campos")
                return false
            }
        }
    
        for (const cpf of arrayDataCpf) {
            if(cpf == dataUser.cpf){
                alert("Atenção! Esse cpf já existe! Insira algum diferente")
                return false
            }
        }
    
        for (const email of arrayDataEmail) {
            if(email == dataUser.email){
                alert("Atenção! Esse email já existe! Insira algum diferente")
                return false
            }
        }

        return true
    }

    async function writeUser() {
        //criar o login do usuário e o adicionar no bd
        await createUserWithEmailAndPassword(auth, dataUser.email, dataUser.senha)
        .then((userCredential) => {
            const user = userCredential.user;

            set(ref(database, `/users/${user.uid}/dataLogin`), dataUser);
        })
        .catch((error) => {
            const errorMessage = error.message;
            
            alert(`${errorMessage}`)
        });

    
        //Logar o usuário na aplicação 
        await signInWithEmailAndPassword(auth, dataUser.email, dataUser.senha)
        .then((userCredential) => {
            const user = userCredential.user; 
        })
        .catch((error) => {
            const errorMessage = error.message;

            alert(`${errorMessage}`)
        });
        
        
    }
    
    
    if(verification()){
        writeUser()

        setTimeout(() => {
            window.location.href = '../pages/usuario/perfil.html'
        }, 2000);

    }

});