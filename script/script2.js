let divAparecer = document.querySelector("#previsaoProximos");
let gridTemplate = document.getElementById("grid");
let x = 0;

function mostrarEsconder(botao) {
  if (x == 1) {
    divAparecer.style.display = "none";
    gridTemplate.style.gridTemplate = "auto / auto"
    botao.value = "Mostrar previsão para próximos dias";
    x = 0;
  } else {
    divAparecer.style.display = "flex";
   gridTemplate.style.gridTemplate = "1fr 1fr / 1fr"
    botao.value = "Esconder previsão para próximos dias";
    x = 1;
  }
}
