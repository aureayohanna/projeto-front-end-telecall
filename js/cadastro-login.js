let nome = document.querySelector('#name')
let ValidNome = false

var dataNascimento = document.getElementById("birthdate");
let ValiddataNascimento = false

var maternalname = document.getElementById("maternalname");
let Validmaternalname = false

var inputCelular = document.getElementById("numbercel");
let ValidCelular = false

var inputTel = document.getElementById("numbertel");
let ValidTelefone = false

var usuario = document.getElementById("user");
let ValidUser = false

var cpfInput = document.getElementById("cpf");
let ValidaCPF = false

let senha = document.querySelector('#password')
let ValidSenha = false

let ConfirmarSenha = document.querySelector('#ConfirmPassword')

let gender = document.querySelector('#gender')
let ValidGender = false

let cep = document.querySelector('#cep')
let ValidCEP = false

var inputNumero = document.getElementById("number");
let ValidNumeroCEP = false

var inputComplemento = document.getElementById("complemento");
let ValidComplemento = false


function cadastrar(){
  if(ValidNome && ValidUser && ValiddataNascimento && Validmaternalname && ValidCelular && ValidTelefone && ValidaCPF && ValidSenha && ValidCEP && ValidNumeroCEP && ValidComplemento){
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

    listaUser.push(
      {
        nomeCad: nome.value,
        userCad: usuario.value,
        nascimentoCad: dataNascimento.value,
        maternoCad: maternalname.value,
        celularCad: inputCelular.value,
        telefoneCad: inputTel.value,
        cpfCad: cpfInput.value,
        senhaCad: senha.value,
        cepCad: cep.value,
        numeroCad: inputNumero.value,
        complementoCad: inputComplemento.value
      }
    )

    localStorage.setItem('listaUser', JSON.stringify(listaUser))

    showMyModal("Usuário Cadastrado!");

    window.location.href = '../html/cadastro-login.html'
  }

  else{
    showErrorModal("Preencha todos os campos corretamente antes de cadastrar.");
  }
}


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

//VALIDAÇÃO NOME
function fullNameValidation() {

  if (nome.value.length > 0 && nome.value.length < 15) {
    showErrorModal("Nome tem que ter mais de 15 digitos e menos de 60");


    console.log("< 15");
    ValidNome = false
  } 
  
  else if (nome.value.length >= 15) {
    nome.classList.remove("error");
    ValidNome = true
  }

  if (nome.value.length >= 60) {
    nome.value = nome.value.substring(0, 60);
    showErrorModal("Nome tem que ter mais de 15 digitos e menos de 60");
    ValidNome = false
  }
}

//VALIDAÇÃO IDADE
function verificarIdade() {
  var dataAtual = new Date();
  var anoAtual = dataAtual.getFullYear();
  var mesAtual = dataAtual.getMonth() + 1;
  var diaAtual = dataAtual.getDate();

  var partesData = dataNascimento.value.split("-");
  var anoNascimento = parseInt(partesData[0]);
  var mesNascimento = parseInt(partesData[1]);
  var diaNascimento = parseInt(partesData[2]);

  var idade = anoAtual - anoNascimento;

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }
  console.log(idade);
  if (idade >= 18) {
    dataNascimento.classList.remove("error");
    ValiddataNascimento = true

  } 
  
  else {
    showErrorModal("Usuário tem que ter mais de 18 anos");
    ValiddataNascimento = false
  }
}

//VALIDAÇÃO NOME MATERNO
function motherNameValidation() {
  if (maternalname.value.length > 0 && maternalname.value.length < 15 || maternalname.value.lenght > 60) {
    showErrorModal("Nome Materno tem que ter mais de 15 digitos e menos de 60");
    maternalname.classList.add("error");
    Validmaternalname = false
  } 
  
  else if (maternalname.value.length >= 15) {
    maternalname.classList.remove("error");
    Validmaternalname = true
  }

  if (maternalname.value.length >= 60) {
    maternalname.classList.add("error");
    maternalname.value = nome.value.substring(0, 60);
    showErrorModal("Nome Materno tem que ter mais de 15 digitos e menos de 60");
    Validmaternalname = false
  }
}


function verificarNumeroCelular() {
  var numeroCelular = inputCelular.value;

  // Remover espaços em branco e caracteres não numéricos
  numeroCelular = numeroCelular.replace(/\s/g, "").replace(/\D/g, "");

  // Verificar se o número tem 11 dígitos, incluindo o DDD
  if (numeroCelular.length !== 13) {
    showErrorModal("Celular Inválido");
    inputCelular.classList.add("error"); // Adicionar classe de erro ao campo de entrada
    ValidCelular = false
  }

  var ddd = numeroCelular.substring(2, 4);

  // Expressão regular para validar o DDD
  var dddRegex = /^(11|12|13|14|15|16|17|18|19|21|22|24|27|28|31|32|33|34|35|37|38|41|42|43|44|45|46|47|48|49|51|53|54|55|61|62|63|64|65|66|67|68|69|71|73|74|75|77|79|81|82|83|84|85|86|87|88|89|91|92|93|94|95|96|97|98|99)$/;

  // Verificar se o DDD é válido
  if (!dddRegex.test(ddd)) {
    showErrorModal("DDD de celular Inválido");
    inputCelular.classList.add("error"); // Adicionar classe de erro ao campo de entrada
    ValidCelular = false
  }

  // Aplicar a máscara
  var numeroFormatado = aplicarMascaraNumeroCelular(numeroCelular);

  // Atualizar o valor do campo de entrada com o número formatado
  inputCelular.value = numeroFormatado;
  inputCelular.classList.remove("error"); // Remover classe de erro do campo de entrada
  ValidCelular = true
}


function aplicarMascaraNumeroCelular(numeroCelular) {
  // Aplica a máscara
  var numeroFormatado = numeroCelular.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, "+$1 ($2) $3-$4");

  return numeroFormatado;
}

// Função para exibir mensagem de erro
function showErrorModal(message) {
  alert("Erro: " + message);
}

var inputCelular = document.getElementById("numbercel");

// Evento para adicionar o prefixo "+55" ao obter o foco
inputCelular.addEventListener("focus", function () {
  if (!this.value.startsWith("+55")) {
    this.value = "+55 " + this.value;
  }
});

// Função para formatar o celular durante a digitação
function formatarCelular(input) {
  var numero = input.value.replace(/\D/g, ""); // Remover caracteres não numéricos

  var formatado = "+55 ";
  var tamanho = numero.length;

  if (tamanho > 2) {
    formatado += "(" + numero.substring(2, 4);
    if (tamanho > 4) {
      formatado += ") " + numero.substring(4, 9);
      if (tamanho > 9) {
        formatado += "-" + numero.substring(9, 13);
      }
    }
  }

  input.value = formatado;
}

// Event listener para formatar o celular enquanto o usuário digita
inputCelular.addEventListener("input", function () {
  formatarCelular(this);
});



function verificaTelefoneFixo() {
  var inputTel = document.getElementById("numbertel");
  var numeroTel = inputTel.value;

  // Remover espaços em branco e caracteres não numéricos
  numeroTel = numeroTel.replace(/\s/g, "").replace(/\D/g, "");

  // Verificar se o número tem 10 dígitos, incluindo o DDD
  if (numeroTel.length !== 10) {
    showErrorModal("Telefone fixo inválido");
    inputTel.classList.add("error"); // Adicionar classe de erro ao campo de entrada
    ValidTelefone = false
  }

  var ddd = numeroTel.substring(0, 2);

  // Expressão regular para validar o DDD
  var dddRegex = /^(11|12|13|14|15|16|17|18|19|21|22|24|27|28|31|32|33|34|35|37|38|41|42|43|44|45|46|47|48|49|51|53|54|55|61|62|63|64|65|66|67|68|69|71|73|74|75|77|79|81|82|83|84|85|86|87|88|89|91|92|93|94|95|96|97|98|99)$/;

  // Verificar se o DDD é válido
  if (!dddRegex.test(ddd)) {
    showErrorModal("DDD de telefone fixo inválido");
    inputTel.classList.add("error"); // Adicionar classe de erro ao campo de entrada
    ValidTelefone = false
  }

  inputTel.classList.remove("error"); // Remover classe de erro do campo de entrada
  ValidTelefone = true
}

function formatarTel(input) {
  var numero = input.value.replace(/\D/g, ""); // Remover caracteres não numéricos

  var formatado = "(" + numero.substring(0, 2) + ") ";

  if (numero.length > 2) {
    formatado += numero.substring(2, 6);
  }

  if (numero.length > 6) {
    formatado += "-" + numero.substring(6, 10);
  }

  input.value = formatado;
}


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


first_password = "";
function verifySenha(senha) {
  if (senha.value.length != 8) {
    showErrorModal("A senha deve conter exatos 8 digitos");
    ValidSenha = false
  }
  first_password = senha.value;
  ValidSenha = true
}

function compareSenha(senha) {
  if (senha.value != first_password) {
    showErrorModal("Senhas Não Batem");
  }
}

function userNameValidation() {

  if ((usuario.value.length > 0 && usuario.value.length < 6) || usuario.value.length > 6){
    showErrorModal("User Tem que ter exatamente 6 digitos");
    ValidUser = false
  } 
  
  else {
    usuario.classList.remove("error");
    ValidUser = true
  }
}


function verificarCPF() {
  var inputCPF = document.getElementById("cpfInput");
  var cpf = cpfInput.value.replace(/\D/g, ""); // Remover caracteres não numéricos

  if (cpf.length !== 11 || !validCpf(cpf)) {
    // CPF inválido
    showErrorModal("CPF inválido. Por favor, insira um CPF válido.");
    return;
  }

  ValidaCPF = true
  console.log("CPF válido: " + cpf);
}
function validCpf(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Remover caracteres não numéricos

  if (cpf.length !== 11) {
    return false; // CPF deve ter 11 dígitos
  }

  // Verificar se todos os dígitos são iguais, o que não é válido para um CPF
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Verificar o primeiro dígito verificador
  var soma = 0;
  for (var i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  var resto = soma % 11;
  var digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
  if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
    return false;
  }

  // Verificar o segundo dígito verificador
  soma = 0;
  for (var j = 0; j < 10; j++) {
    soma += parseInt(cpf.charAt(j)) * (11 - j);
  }
  resto = soma % 11;
  var digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
  if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
    return false;
  }

  ValidaCPF = true
  return true; // CPF válido
}


const handleZipCode = (event) => {
  let input = event.target
  input.value = zipCodeMask(input.value)
}

const zipCodeMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{5})(\d)/,'$1-$2')
  return value
}

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('rua').value=("");
  document.getElementById('bairro').value=("");
  document.getElementById('cidade').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
  //Atualiza os campos com os valores.
  document.getElementById('rua').value=(conteudo.logradouro);
  document.getElementById('bairro').value=(conteudo.bairro);
  document.getElementById('cidade').value=(conteudo.localidade);
} //end if.
else {
  //CEP não Encontrado.
  limpa_formulário_cep();
  showErrorModal("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var inputCep = document.getElementById('cep');
var cep = inputCep.value.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

  //Expressão regular para validar o CEP.
  var validacep = /^[0-9]{8}$/;

  //Valida o formato do CEP.
  if(validacep.test(cep)) {

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('rua').value="...";
      document.getElementById('bairro').value="...";
      document.getElementById('cidade').value="...";

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);
      ValidCEP = true
  }
   //end if.
  else {
      //cep é inválido.
      limpa_formulário_cep();
      showErrorModal("Formato de CEP inválido.");
      ValidCEP = false
  }
}
 //end if.
else {
  //cep sem valor, limpa formulário.
  limpa_formulário_cep();
}
};

var inputCep = document.getElementById("cep");

function verificarCep() {
  var cep = inputCep.value.trim(); // Remover espaços em branco do início e fim do valor

  if (cep === "") {
    showErrorModal("Insira um CEP válido");
    inputCep.classList.add("error");
    return false;
  }

  inputCep.classList.remove("error");
  return true;
}

// Event listener para verificar o CEP ao sair do campo
inputCep.addEventListener("blur", function () {
  verificarCep();
});



//VALIDAR NUMERO
function verificarNumero() {
  var numero = inputNumero.value.trim(); // Remover espaços em branco do início e fim do valor

  if (numero === "") {
    showErrorModal("Insira um número válido");
    inputNumero.classList.add("error");
    ValidNumeroCEP = false
  }

  inputNumero.classList.remove("error");
  ValidNumeroCEP = true
}

// Event listener para verificar o Número ao sair do campo
inputNumero.addEventListener("blur", function () {
  verificarNumero();
});


//VALIDAR COMPLEMENTO
function verificarComplemento() {
  var complemento = inputComplemento.value.trim(); // Remover espaços em branco do início e fim do valor

  if (complemento === "") {
    showErrorModal("Insira um complemento válido");
    inputComplemento.classList.add("error");
    ValidComplemento = false
  }

  inputComplemento.classList.remove("error");
  ValidComplemento = true
}

// Event listener para verificar o Complemento ao sair do campo
inputComplemento.addEventListener("blur", function () {
  verificarComplemento();
});

