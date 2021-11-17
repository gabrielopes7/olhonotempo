// Esse script tem o único objetivo de mostrar no HTML a Div que contém as previsões dos próximos dias. Através dos botões ela mostra e esconde.

let divAparecer = document.querySelector("#previsaoProximos");
let gridTemplate = document.getElementById("grid");
let x = 0;

function mostrarEsconder(botao) {
  if (x == 1) {
    divAparecer.style.display = "none";
    gridTemplate.style.gridTemplate = "auto / auto";
    botao.value = "Mostrar mais";
    x = 0;
  } else {
    divAparecer.style.display = "flex";
    gridTemplate.style.gridTemplate = "1fr 1fr / 1fr";
    botao.value = "Esconder";
    x = 1;
  }
}
