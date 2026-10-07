var nameEmp = document.getElementById("nameEmp");
let ValidNameEmp = false

var fantasianame = document.getElementById("fantasianame");
let ValidFantasiaName = false

var createdate = document.getElementById("createdate");
let ValidCreateDate = false

var inputCelular = document.getElementById("numbercel");
let ValidCelularPJ = false

var inputTel = document.getElementById("numbertel");
let ValidTelefonePJ = false

var user = document.getElementById("user");
let ValidUserPJ = false

let senha = document.querySelector('#password')
let ValidSenha = false

var cnpjInput = document.getElementById("cnpjInput");
let ValidCNPJ = false

let cep = document.querySelector('#cep')
let ValidCEP = false

function cadastrar(){
    if(ValidNameEmp && ValidFantasiaName && ValidCreateDate && ValidCelularPJ && ValidTelefonePJ && ValidUserPJ && ValidSenha && ValidCNPJ && ValidCEP){
      let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

      listaUser.push(
        {
          nomeEmpresaCad: nameEmp.value,
          nomeFantasiaCad: fantasianame.value,
          createdateCad: createdate.value,
          inputCelularCad: inputCelular.value,
          inputTelefoneCad: inputTel.value,
          userCad: user.value,
          senhaCad: senha.value,
          cnpjInputCad: cnpjInput.value,
          cepCad: cep.value
        }
      )
  
      localStorage.setItem('listaUser', JSON.stringify(listaUser))
  
      showMyModal("Usuário Cadastrado!");
  
      window.location.href = '../html/cadastro-login-pj.html'
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



function verificarNumeroCelular() {
  var numeroCelular = inputCelular.value;

  // Remover espaços em branco e caracteres não numéricos
  numeroCelular = numeroCelular.replace(/\s/g, "").replace(/\D/g, "");

  // Verificar se o número tem 11 dígitos, incluindo o DDD
  if (numeroCelular.length !== 13) {
    showErrorModal("Celular Inválido");
    inputCelular.classList.add("error"); // Adicionar classe de erro ao campo de entrada
    ValidCelularPJ = false
  }

  var ddd = numeroCelular.substring(2, 4);

  // Expressão regular para validar o DDD
  var dddRegex = /^(11|12|13|14|15|16|17|18|19|21|22|24|27|28|31|32|33|34|35|37|38|41|42|43|44|45|46|47|48|49|51|53|54|55|61|62|63|64|65|66|67|68|69|71|73|74|75|77|79|81|82|83|84|85|86|87|88|89|91|92|93|94|95|96|97|98|99)$/;

  // Verificar se o DDD é válido
  if (!dddRegex.test(ddd)) {
    showErrorModal("DDD de celular Inválido");
    inputCelular.classList.add("error"); // Adicionar classe de erro ao campo de entrada
    ValidCelularPJ = false
  }

  // Aplicar a máscara
  var numeroFormatado = aplicarMascaraNumeroCelular(numeroCelular);

  // Atualizar o valor do campo de entrada com o número formatado
  inputCelular.value = numeroFormatado;
  inputCelular.classList.remove("error"); // Remover classe de erro do campo de entrada
  ValidCelularPJ = true
}


function aplicarMascaraNumeroCelular(numeroCelular) {
  // Aplica a máscara
  var numeroFormatado = numeroCelular.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, "+$1 ($2) $3-$4");

  return numeroFormatado;
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
  var numeroTel = inputTel.value;
  
  // Remover espaços em branco e caracteres não numéricos
  numeroTel = numeroTel.replace(/\s/g, "").replace(/\D/g, "");
  
  // Verificar se o número tem 10 dígitos, incluindo o DDD
  if (numeroTel.length !== 10) {
    showErrorModal("Telefone fixo inválido");
    inputTel.classList.add("error"); // Adicionar classe de erro ao campo de entrada
    ValidTelefonePJ = false
  }
  
  var ddd = numeroTel.substring(0, 2);
  
  // Expressão regular para validar o DDD
  var dddRegex = /^(11|12|13|14|15|16|17|18|19|21|22|24|27|28|31|32|33|34|35|37|38|41|42|43|44|45|46|47|48|49|51|53|54|55|61|62|63|64|65|66|67|68|69|71|73|74|75|77|79|81|82|83|84|85|86|87|88|89|91|92|93|94|95|96|97|98|99)$/;
  
  // Verificar se o DDD é válido
  if (!dddRegex.test(ddd)) {
    showErrorModal("DDD de telefone fixo inválido");
    inputTel.classList.add("error"); // Adicionar classe de erro ao campo de entrada
    ValidTelefonePJ = false
  }
  
  inputTel.classList.remove("error"); // Remover classe de erro do campo de entrada
  ValidTelefonePJ = true
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

function verificarCNPJ() {
  let cnpjInput = document.getElementById("cnpjInput");
  let cnpj = cnpjInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cnpj.length !== 14 || !validarCNPJ(cnpj)) {
      showErrorModal("CNPJ inválido. Por favor, insira um CNPJ válido.");
      cnpjInput.classList.add("error");
      ValidCNPJ = false
  } 
  
  else {
      cnpjInput.classList.remove("error");
      ValidCNPJ = true
  }
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cnpj.length !== 14) {
      return false; // CNPJ deve ter 14 dígitos
  }

  // Verificar se todos os dígitos são iguais, o que não é válido para um CNPJ
  if (/^(\d)\1+$/.test(cnpj)) {
      return false;
  }

  // Verificar o primeiro dígito verificador
  let soma = 0;
  let peso = 2;
  for (let i = 11; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
  }
  let digitoVerificador1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (parseInt(cnpj.charAt(12)) !== digitoVerificador1) {
      return false;
  }

  // Verificar o segundo dígito verificador
  soma = 0;
  peso = 2;
  for (let i = 12; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
  }
  let digitoVerificador2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (parseInt(cnpj.charAt(13)) !== digitoVerificador2) {
      return false;
  }

  return true;
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

function NameEmpValidation() {

  if (nameEmp.value.length > 0) {
    nameEmp.classList.remove("error");
    ValidNameEmp = true
  } 
  
  else if (nameEmp.value.length <= 0) {
    showErrorModal("Preencha este campo.");
    nameEmp.classList.add("error");
    ValidNameEmp = false
  }
}

function userNameValidation() {

  if (user.value.length > 0 && user.value.length === 6) {
    user.classList.remove("error");
    ValidUserPJ = true
  } 
  
  else {
    showErrorModal("O nome de usuário deve ter 6 caracteres.");
    user.classList.add("error");
    ValidUserPJ = false
  }
}


function fantasiaNameValidation() {

  if (fantasianame.value.length > 0) {
    fantasianame.classList.remove("error");
    ValidFantasiaName = true
  } 
  
  else if (fantasianame.value.length <= 0) {
    showErrorModal("Preencha este campo.");
    fantasianame.classList.add("error");
    ValidFantasiaName = false
  }
}


function verificarCreateDate() {
  var selectedDate = new Date(createdate.value);
  var currentDate = new Date();

  if (selectedDate <= currentDate) {
    createdate.classList.remove("error");
    ValidCreateDate = true
  }
  
  else {
    showErrorModal("Insira uma data válida.");
    createdate.classList.add("error");
    ValidCreateDate = false
  }
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