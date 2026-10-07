/**botao A para exibir botoes aumentar e diminuir */
document.getElementById('btnExibir').addEventListener('click', function() {
    var botoes = document.getElementById('botoes');
    if (botoes.style.display === 'none') {
      botoes.style.display = 'block';
    } else {
      botoes.style.display = 'none';
    }
  });
  
  /**aumentar e diminuir fonte*/
  var $btnAumentar = $("#btnAumentar");
  var $btnDiminuir = $("#btnDiminuir");
  var $elemento = $("body #content").find("*"); //encontra todos os elementos dentro do #content
  var fonts = [];
  
  function obterTamanhoFonte() {
    for (var i = 0; i < $elemento.length; i++) {
      fonts.push(parseFloat($elemento.eq(i).css('font-size')));
    }
  }
  obterTamanhoFonte();
  $btnAumentar.on('click', function() {
    for (var i = 0; i < $elemento.length; i++) {
      ++fonts[i];
      $elemento.eq(i).css('font-size', fonts[i]);
    }
  });
  
  $btnDiminuir.on('click', function() {
    for (var i = 0; i < $elemento.length; i++) {
      --fonts[i];
      $elemento.eq(i).css('font-size', fonts[i]);
    }
  });