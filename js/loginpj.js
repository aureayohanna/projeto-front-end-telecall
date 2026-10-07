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

var cnpjInput = document.getElementById("cnpjInput");

function formatarCNPJ(cnpjInput) {
  let cnpj = cnpjInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (cnpj.length > 14) {
      cnpj = cnpj.slice(0, 14); // Limita a 14 dígitos
  }
  cnpj = cnpj.replace(/(\d{2})(\d)/, "$1.$2"); // Adiciona o primeiro ponto
  cnpj = cnpj.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o segundo ponto
  cnpj = cnpj.replace(/(\d{3})(\d)/, "$1/$2"); // Adiciona a barra
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2"); // Adiciona o hífen
  cnpjInput.value = cnpj;
}

function entrar(){
    let loginCNPJ = document.querySelector('#loginCNPJ')
    let loginPassword = document.querySelector('#loginPassword')

    let listaUser = []

    let userValid = {
        nome: '',
        nomeFantasia: '',
        dataDeCriação: '',
        celular: '',
        telefone: '',
        usuario: '',
        senha: '',
        cnpj: '',
        cep: '',
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'))

    listaUser.forEach((item) => {
        if(loginCNPJ.value == item.cnpjInputCad && loginPassword.value == item.senhaCad){
            userValid = {
                nome: item.nomeEmpresaCad,
                nomeFantasia: item.nomeFantasiaCad,
                dataDeCriação: item.createdateCad,
                celular: item.inputCelularCad,
                telefone: item.inputTelefoneCad,
                usuario: item.userCad,
                senha: item.senhaCad,
                cnpj: item.cnpjInputCad,
                cep: item.cepCad
            }

        }
    });

    if(loginCNPJ.value == userValid.cnpj && loginPassword.value == userValid.senha){
        window.location.href = '../html/indexlogado.html'

        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)

        localStorage.setItem('userLogado', JSON.stringify(userValid))
    }

    else{
        showErrorModal("CNPJ ou senha incorretos.")
        loginCNPJ.focus()
    }
}

let userLogado = JSON.parse(localStorage.getItem('userLogado'))

let logado = document.querySelector('#logado')
let pcliente = document.querySelector('#pcliente')

logado.innerHTML = `${userLogado.nome}, CONHEÇA A TELECALL `

function sair(){
    localStorage.removeItem('token')
}