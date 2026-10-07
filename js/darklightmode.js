const chk = document.getElementById("mode")

chk.addEventListener('change', () =>{
    document.body.classList.toggle('dark')
})

const darkModeEnabled = getCookie("darkModeEnabled"); // Obtém o valor do cookie

// Verifica se o dark mode está ativado no cookie e aplica o estilo correspondente
if (darkModeEnabled === "true") {
  document.body.classList.add("dark");
  chk.checked = true;
}

chk.addEventListener("change", () => {
  if (chk.checked) {
    document.body.classList.add("dark");
    setCookie("darkModeEnabled", true, 30); // Define o cookie com o valor "true" por 30 dias
  } else {
    document.body.classList.remove("dark");
    setCookie("darkModeEnabled", false, 30); // Define o cookie com o valor "false" por 30 dias
  }
});

// Função para obter o valor de um cookie
function getCookie(name) {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return "";
}

// Função para definir um cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}
