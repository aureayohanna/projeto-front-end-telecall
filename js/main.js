/**animações**/

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**preloader**/

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**sticky header on scroll**/
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

document.getElementById('submitBtn').addEventListener('click', function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Verifique se os campos estão preenchidos
  if (verificarCampos()) {
    // Exiba o modal de mensagem enviada
    exibirModal('enviado');
  } 
  
  else {
    // Exiba o modal de campos vazios
    exibirModal('preencher');
  }
});

function verificarCampos() {
  // Verifique se os campos estão preenchidos
  var nome = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var empresa = document.getElementById('empresa').value;
  var telefone = document.getElementById('tel').value;
  var mensagem = document.getElementById('message').value;

  // Retorna true se todos os campos estiverem preenchidos, caso contrário, retorna false
  return nome !== '' && email !== '' && empresa !=='' && telefone !=='' && mensagem !== '';
}

function exibirModal(tipo) {
  // Obtenha o elemento do modal e o parágrafo de mensagem dentro do modal
  var modal = document.getElementById('modal');
  var mensagem = document.getElementById('modal-mensagem');

  // Defina a mensagem correta com base no tipo de modal
  if (tipo === 'enviado') {
    mensagem.textContent = 'Mensagem enviada com sucesso!';
  } 
  
  else if (tipo === 'preencher') {
    mensagem.textContent = 'Por favor, preencha todos os campos.';
  }

  // Exiba o modal
  modal.style.display = 'block';
}

// Obtém o modal de confirmação
var modal = document.getElementById("modal");

// Obtém o botão de fechar o modal
var closeBtn = document.getElementsByClassName("close")[0];

// Função para exibir o modal
function showModal() {
  modal.style.display = "block";
}

// Função para fechar o modal ao clicar no botão de fechar
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Função para fechar o modal ao clicar fora do modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Obtém o formulário
var form = document.getElementById("formMessage");

// Função para limpar os inputs
document.getElementById('submitBtn').addEventListener('click',function clearInputs() {
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var empresaInput = document.getElementById('empresa');
  var telefoneInput = document.getElementById('tel');
  var mensagemInput = document.getElementById('message');

  nameInput.value = "";
  emailInput.value = "";
  empresaInput.value = "";
  telefoneInput.value = "";
  mensagemInput.value = "";
})

