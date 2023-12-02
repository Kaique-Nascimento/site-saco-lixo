var compre = document.getElementById('compre');
              var pedido = document.getElementById('pedido');
              var cancelar= document.getElementById('cancelar');
              var caixinha = document.querySelectorAll('.caixinha');
              var quantidade = document.querySelectorAll('.quantidade');
              var totalLabel = document.getElementById('totalLabel');
var sacos_escolhidos = "";
var tipo_saco = "";
function mostra() {
    pedido.style.display = "block";
    totalLabel.style.display = "block";
    cancelar.style.display = "block";
    compre.style.display = "none";
    
    caixinha.forEach(caixinha => {
      caixinha.style.display = 'block';
    });
  
    quantidade.forEach(quantidade => {
      quantidade.value = "0";
    });
  }
  function esconde() {
    pedido.style.display = "none";
    totalLabel.style.display = "none";
    cancelar.style.display = "none";
    compre.style.display = "block";
  
    caixinha.forEach(caixinha => {
      caixinha.style.display = 'none';
    });
  
    quantidade.forEach(quantidade => {
      quantidade.value = "0";
    });
    totalLabel.innerHTML = "R$0.00";

  }
var pedidos = {};

var precos = {
  pia: 40,
  '20litros': 45,
  '40litros': 50,
  '60litros': 55,
  '60grosso': 60,
  '100litros': 70,
  '100grosso': 80,
  '100reforcado': 100,
  '200litros': 75
};

function atualizaQuantidade(idDoSaco, incremento) {
  var elementoQuantidade = document.getElementById('quantidade_' + idDoSaco);
  var quantidadeAtual = parseInt(elementoQuantidade.value) || 0;

  if (quantidadeAtual + incremento >= 0 && quantidadeAtual + incremento <= 10) {
    elementoQuantidade.value = quantidadeAtual + incremento;

    pedidos[idDoSaco] = quantidadeAtual + incremento;

    atualizaListaPedidos();
    atualizaTotal();
  }
}

function formatarNomeSaco(idDoSaco) {
  var nomeSaco = idDoSaco.replace(/^(\d+)([a-zA-Z_]+)/g, '$1 $2');
  return nomeSaco; 
}
function atualizaListaPedidos() {
  var listaPedidos = document.getElementById('pedidos');
  listaPedidos.innerHTML = '';

  for (var saco in pedidos) {
    var quantidade = pedidos[saco];
    var nomeSaco = formatarNomeSaco(saco);

    if (quantidade > 0) {
      var li = document.createElement('li');
      li.style.textAlign = "left";
      li.textContent = `${nomeSaco} - ${quantidade}`;
      listaPedidos.appendChild(li);
    }
  }
}

function atualizaTotal() {
  var total = 0;
  for (var saco in pedidos) {
    var quantidade = pedidos[saco];
    var preco = precos[saco] || 0;

    total += quantidade * preco;
  }

  totalLabel.textContent = `Total: R$ ${total.toFixed(2)}`;
  var totale = document.getElementById('total');
  totale.textContent = `Total: R$ ${total.toFixed(2)}`

}


function validarQuantidade(input) {
  input.value = input.value.replace(/[^\d]/g, '');

  var quantidade = parseInt(input.value) || 0;
  quantidade = Math.min(quantidade, 10);
  input.value = quantidade;

  pedidos[input.id.replace('quantidade_', '')] = quantidade;

  atualizaListaPedidos();
  atualizaTotal();
}

document.getElementById('quantidade_pia').addEventListener('input', function() {
  validarQuantidade(this);
});

  function modalPedido(){
    var quantidade = document.querySelectorAll('.quantidade');
var e = "";
    quantidade.forEach(quantidade => {
                       e += quantidade.value;
                     });
                     if(e == 0){
alert("Escolha algum saco");
                     }
                     else{
                        document.getElementById("pedido");
                        var myModal = new bootstrap.Modal(
                          document.getElementById("pedido_modal")
                        );
                        myModal.show();
                     }

  }
  function enviarMensagem() {
    var listaPedidos = document.querySelectorAll('#pedidos li');
    var dataAtual = new Date();
  
    var saudacao = 'Bom dia';
    if (dataAtual.getHours() >= 12 && dataAtual.getHours() < 18) {
      saudacao = 'Boa tarde';
    } else if (dataAtual.getHours() >= 18) {
      saudacao = 'Boa noite';
    }
    
    var mensagem = `${saudacao}, eu quero comprar os sacos:\n`;
  
    listaPedidos.forEach(function (item) {
      mensagem += item.textContent + '\n';
    });
    var totali = totalLabel.textContent;
  mensagem+="\nPreço "+totali;
    if (mensagem.trim() !== '') {
      mensagem = mensagem.trim();  
      var target = `https://wa.me/5511972757489?text=${encodeURIComponent(mensagem)}`;
      window.location.href = target;
    } else {
      alert('A lista de pedidos está vazia.');
    }
  }
  
  
  