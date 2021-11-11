let url1 = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome";
let data = new Date();

let dataHoje = `${("00" + data.getDate()).slice(-2)}/${data.getMonth() + 1}/${data.getFullYear()}`;

let dataAmanha = `${("00" + (data.getDate() + 1)).slice(-2)}/${ data.getMonth() + 1}/${data.getFullYear()}`;
let dataProximoDiaUm = `${("00" + (data.getDate() + 2)).slice(-2)}/${ data.getMonth() + 1}/${data.getFullYear()}`;
let dataProximoDiaDois  = `${("00" + (data.getDate() + 3)).slice(-2)}/${ data.getMonth() + 1}/${data.getFullYear()}`;
let dataProximoDiaTres  = `${("00" + (data.getDate() + 4)).slice(-2)}/${ data.getMonth() + 1}/${data.getFullYear()}`;




function pegarCidade() {
  let nomeCidade = document.getElementById("nomeCidade").value;

  fetch(url1)
    .then((res) => {
      return res.json();
    })
    .then((dados) => {
      if (dados.find((city) => city.nome == nomeCidade) == undefined) {
        alert("Digite corretamente o nome da cidade");
        return;
      }
      let cidade = dados.find((city) => city.nome == nomeCidade).id;
      cidadePrevisao(cidade);
    });
}

function cidadePrevisao(cidade) {
  let url2 = "https://apiprevmet3.inmet.gov.br/previsao/" + cidade.toString();
  fetch(url2)
    .then((res) => {
      return res.json();
    })
    .then((dados) => {
      let hoje = dados[cidade][`${dataHoje}`].manha;
      let amanha = dados[cidade][`${dataAmanha}`].manha;
      let proximoDiaUm = dados[cidade][`${dataProximoDiaUm}`];
      let proximoDiaDois = dados[cidade][`${dataProximoDiaDois}`];
      let proximoDiaTres = dados[cidade][`${dataProximoDiaTres}`];

      divHoje(hoje);
      divAmanha(amanha);
      // divProximos();

    });
}



function divHoje(hoje) {

  let dadosClima = document.getElementsByClassName("dadosClima");

  
  let {dia_semana, entidade, resumo, temp_max, temp_min } = hoje;


  dadosClima[0].innerText = `${dia_semana}`
  dadosClima[1].innerText = `${entidade}`
  dadosClima[2].innerText = `${resumo}`
  dadosClima[3].innerText = `Temperatura máxima: ${temp_max}`
  dadosClima[4].innerText = `Temperatura mínima: ${temp_min}`
  
}

function divAmanha(amanha){
  let dadosClima = document.getElementsByClassName("dadosClima");

  let {dia_semana, entidade, resumo, temp_max, temp_min } = amanha;

  dadosClima[5].innerText = `${dia_semana}`
  dadosClima[6].innerText = `${entidade}`
  dadosClima[7].innerText = `${resumo}`
  dadosClima[8].innerText = `Temperatura máxima: ${temp_max}`
  dadosClima[9].innerText = `Temperatura mínima: ${temp_min}`

}
