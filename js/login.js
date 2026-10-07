// Função para exibir o modal de erro
function showErrorModal(message) {
    var modal = document.getElementById("errorModal");
    var errorMessage = document.getElementById("errorMessage");
  
    errorMessage.innerText = message;
    modal.style.display = "block";
  
    // Fechar o modal ao clicar no botão "Fechar" (X)
    var closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
  
    // Fechar o modal ao clicar fora dele
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
  
  // Função para exibir o modal de mensagem
  function showMyModal(message) {
    var modalsuccess = document.getElementById("modal");
    var successMessage = document.getElementById("modalMessage");
  
    successMessage.innerText = message;
    modalsuccess.style.display = "block";
  
    // Fechar o modal ao clicar no botão "Fechar" (X)
    var closeBtnModal = document.getElementsByClassName("close")[0];
    closeBtnModal.onclick = function () {
      modalsuccess.style.display = "none";
    };
  
    // Fechar o modal ao clicar fora dele
    window.onclick = function (event) {
      if (event.target == modalsuccess) {
        modalsuccess.style.display = "none";
      }
    };
  }

var cpfInput = document.getElementById("cpf");

function formatarCPF(input) {
  var cpf = input.value.replace(/\D/g, ""); // Remover caracteres não numéricos

  var formatado = "";
  var tamanho = cpf.length;

  if (tamanho > 0) {
    formatado += cpf.substring(0, 3);
  }
  if (tamanho > 3) {
    formatado += "." + cpf.substring(3, 6);
  }
  if (tamanho > 6) {
    formatado += "." + cpf.substring(6, 9);
  }
  if (tamanho > 9) {
    formatado += "-" + cpf.substring(9, 11);
  }

  input.value = formatado;
}

function entrar(){
    let loginCPF = document.querySelector('#loginCPF')
    let loginPassword = document.querySelector('#loginPassword')

    let listaUser = []

    let userValid = {
        nome: '',
        user: '',
        nascimento: '',
        materno: '',
        celular: '',
        telefone: '',
        cpf: '',
        senha: '',
        cep: '',
        numero: '',
        complemento: '',
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'))

    listaUser.forEach((item) => {
        if(loginCPF.value == item.cpfCad && loginPassword.value == item.senhaCad){
            userValid = {
                nome: item.nomeCad,
                user: item.userCad,
                nascimento: item.nascimentoCad,
                materno: item.maternoCad,
                celular: item.celularCad,
                telefone: item.telefoneCad,
                cpf: item.cpfCad,
                senha: item.senhaCad,
                cep: item.cepCad,
                numero: item.numeroCad,
                complemento: item.complementoCad
            }

        }
    });

    if(loginCPF.value == userValid.cpf && loginPassword.value == userValid.senha){
        window.location.href = '../html/indexlogado.html'

        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)

        localStorage.setItem('userLogado', JSON.stringify(userValid))
    }

    else{
        showErrorModal("CPF ou senha incorretos.")
        loginCPF.focus()
    }
}

let userLogado = JSON.parse(localStorage.getItem('userLogado'))

let logado = document.querySelector('#logado')
let pcliente = document.querySelector('#pcliente')

logado.innerHTML = `${userLogado.nome}, CONHEÇA A TELECALL `

function sair(){
    localStorage.removeItem('token')
}