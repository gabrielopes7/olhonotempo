let url1 = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome";
let data = new Date();
armazenamento();

let dataHoje = `${("00" + data.getDate()).slice(-2)}/${data.getMonth() + 1}/${data.getFullYear()}`;

let dataAmanha = `${("00" + (data.getDate() + 1)).slice(-2)}/${ data.getMonth() + 1}/${data.getFullYear()}`;
let dataProximoDiaUm = `${("00" + (data.getDate() + 2)).slice(-2)}/${ data.getMonth() + 1}/${data.getFullYear()}`;
let dataProximoDiaDois  = `${("00" + (data.getDate() + 3)).slice(-2)}/${ data.getMonth() + 1}/${data.getFullYear()}`;
let dataProximoDiaTres  = `${("00" + (data.getDate() + 4)).slice(-2)}/${ data.getMonth() + 1}/${data.getFullYear()}`;

if(!localStorage.getItem("dia1")){
  let url = "https://apiprevmet3.inmet.gov.br/previsao/3550308"
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((dados) => {
      let hoje = dados[3550308][dataHoje].manha;
      let amanha = dados[3550308][`${dataAmanha}`].manha;
      let proximoDiaUm = dados[3550308][`${dataProximoDiaUm}`];
      let proximoDiaDois = dados[3550308][`${dataProximoDiaDois}`];
      let proximoDiaTres = dados[3550308][`${dataProximoDiaTres}`];

      let dadosClima = document.getElementsByClassName("dadosClima");
      let dadosProximos = document.getElementsByClassName("dadosProximos");

      dadosClima[0].innerText = `${hoje.dia_semana}`
     dadosClima[1].innerText = `${hoje.entidade}`
     dadosClima[2].innerText = `${hoje.resumo}`
     dadosClima[3].innerText = `Temperatura máxima: ${hoje.temp_max}`
     dadosClima[4].innerText = `Temperatura mínima: ${hoje.temp_min}`

     dadosClima[5].innerText = `${amanha.dia_semana}`
     dadosClima[6].innerText = `${amanha.entidade}`
     dadosClima[7].innerText = `${amanha.resumo}`
     dadosClima[8].innerText = `Temperatura máxima: ${amanha.temp_max}`
     dadosClima[9].innerText = `Temperatura mínima: ${amanha.temp_min}`

     dadosProximos[0].innerText = `${proximoDiaUm.dia_semana}`
     dadosProximos[1].innerText = `${proximoDiaUm.entidade}`
     dadosProximos[2].innerText = `${proximoDiaUm.resumo}`
     dadosProximos[3].innerText = `Temperatura máxima: ${proximoDiaUm.temp_max}`
     dadosProximos[4].innerText = `Temperatura mínima: ${proximoDiaUm.temp_min}`

     dadosProximos[5].innerText = `${proximoDiaDois.dia_semana}`
     dadosProximos[6].innerText = `${proximoDiaDois.entidade}`
     dadosProximos[7].innerText = `${proximoDiaDois.resumo}`
     dadosProximos[8].innerText = `Temperatura máxima: ${proximoDiaDois.temp_max}`
     dadosProximos[9].innerText = `Temperatura mínima: ${proximoDiaDois.temp_min}`

     dadosProximos[10].innerText = `${proximoDiaTres.dia_semana}`
     dadosProximos[11].innerText = `${proximoDiaTres.entidade}`
     dadosProximos[12].innerText = `${proximoDiaTres.resumo}`
     dadosProximos[13].innerText = `Temperatura máxima: ${proximoDiaTres.temp_max}`
     dadosProximos[14].innerText = `Temperatura mínima: ${proximoDiaTres.temp_min}`
      

    });
}


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
      divProximoUm(proximoDiaUm);
      divProximoDois(proximoDiaDois);
      divProximoTres(proximoDiaTres);

    });
}



function divHoje(hoje) {

  let dadosClima = document.getElementsByClassName("dadosClima");

  
  let {dia_semana, entidade, resumo, temp_max, temp_min } = hoje;


  dadosClima[0].innerText = `${dia_semana} - ${dataHoje}`
  dadosClima[1].innerText = `${entidade}`
  dadosClima[2].innerText = `${resumo}`
  dadosClima[3].innerText = `Temperatura máxima: ${temp_max}`
  dadosClima[4].innerText = `Temperatura mínima: ${temp_min}`


  let armazenaHoje = {
    dia: (dia_semana),
    diaData: (dataHoje),
    cidade: (entidade),
    resumo: (resumo),
    tempMax: (temp_max),
    tempMin: (temp_min)
  }


  localStorage.setItem("dia1", JSON.stringify(armazenaHoje))
  
  
}

function divAmanha(amanha){
  let dadosClima = document.getElementsByClassName("dadosClima");

  let {dia_semana, entidade, resumo, temp_max, temp_min } = amanha;

  dadosClima[5].innerText = `${dia_semana} - ${dataAmanha}`
  dadosClima[6].innerText = `${entidade}`
  dadosClima[7].innerText = `${resumo}`
  dadosClima[8].innerText = `Temperatura máxima: ${temp_max}`
  dadosClima[9].innerText = `Temperatura mínima: ${temp_min}`

  let armazenaAmanha ={
    dia: (dia_semana),
    diaData: (dataAmanha),
    cidade: (entidade),
    resumo: (resumo),
    tempMax: (temp_max),
    tempMin: (temp_min)
  }

  localStorage.setItem("dia2", JSON.stringify(armazenaAmanha));


}

function divProximoUm(diaUm){
  let dadosProximos = document.getElementsByClassName("dadosProximos");

  let {dia_semana, entidade, resumo, temp_max, temp_min} = diaUm;

  dadosProximos[0].innerText = `${dia_semana} - ${dataProximoDiaUm}`
  dadosProximos[1].innerText = `${entidade}`
  dadosProximos[2].innerText = `${resumo}`
  dadosProximos[3].innerText = `Temperatura máxima: ${temp_max}`
  dadosProximos[4].innerText = `Temperatura mínima: ${temp_min}`

  let armazenaDiaUm ={
    dia: (dia_semana),
    diaData: (dataProximoDiaUm),
    cidade: (entidade),
    resumo: (resumo),
    tempMax: (temp_max),
    tempMin: (temp_min)
  }

  localStorage.setItem("dia3", JSON.stringify(armazenaDiaUm));

};

function divProximoDois(diaDois){
  let dadosProximos = document.getElementsByClassName("dadosProximos");

  let {dia_semana, entidade, resumo, temp_max, temp_min} = diaDois;

  dadosProximos[5].innerText = `${dia_semana} - ${dataProximoDiaDois}`
  dadosProximos[6].innerText = `${entidade}`
  dadosProximos[7].innerText = `${resumo}`
  dadosProximos[8].innerText = `Temperatura máxima: ${temp_max}`
  dadosProximos[9].innerText = `Temperatura mínima: ${temp_min}`

  let armazenaDiaDois ={
    dia: (dia_semana),
    diaData: (dataProximoDiaDois),
    cidade: (entidade),
    resumo: (resumo),
    tempMax: (temp_max),
    tempMin: (temp_min)
  }

  localStorage.setItem("dia4", JSON.stringify(armazenaDiaDois));

}

function divProximoTres(diaTres){
  let dadosProximos = document.getElementsByClassName("dadosProximos");

  let {dia_semana, entidade, resumo, temp_max, temp_min} = diaTres;

  dadosProximos[10].innerText = `${dia_semana} - ${dataProximoDiaTres}`
  dadosProximos[11].innerText = `${entidade}`
  dadosProximos[12].innerText = `${resumo}`
  dadosProximos[13].innerText = `Temperatura máxima: ${temp_max}`
  dadosProximos[14].innerText = `Temperatura mínima: ${temp_min}`

  let armazenaDiaTres ={
    dia: (dia_semana),
    diaData: (dataProximoDiaTres),
    cidade: (entidade),
    resumo: (resumo),
    tempMax: (temp_max),
    tempMin: (temp_min)
  }

  localStorage.setItem("dia5", JSON.stringify(armazenaDiaTres));

}


function armazenamento(){
  if(localStorage.getItem("dia1")){
    let a = JSON.parse(localStorage.getItem("dia1"));
    
    

    let dadosClima = document.getElementsByClassName("dadosClima");

  
    let {dia, diaData, cidade, resumo, tempMax, tempMin } = a;
  
  
    dadosClima[0].innerText = `${dia} - ${diaData}`
    dadosClima[1].innerText = `${cidade}`
    dadosClima[2].innerText = `${resumo}`
    dadosClima[3].innerText = `Temperatura máxima: ${tempMax}`
    dadosClima[4].innerText = `Temperatura mínima: ${tempMin}`
  }

  if(localStorage.getItem("dia2")){
    let b = JSON.parse(localStorage.getItem("dia2"));
    
    

    let dadosClima = document.getElementsByClassName("dadosClima");

  
    let {dia, diaData, cidade, resumo, tempMax, tempMin } = b;
  
  
    dadosClima[5].innerText = `${dia} - ${diaData}`
    dadosClima[6].innerText = `${cidade}`
    dadosClima[7].innerText = `${resumo}`
    dadosClima[8].innerText = `Temperatura máxima: ${tempMax}`
    dadosClima[9].innerText = `Temperatura mínima: ${tempMin}`
  }

  if(localStorage.getItem("dia3")){
    let c = JSON.parse(localStorage.getItem("dia3"));
    
    

    let dadosProximos = document.getElementsByClassName("dadosProximos");

  
    let {dia, diaData, cidade, resumo, tempMax, tempMin } = c;
  
  
    dadosProximos[0].innerText = `${dia} - ${diaData}`
    dadosProximos[1].innerText = `${cidade}`
    dadosProximos[2].innerText = `${resumo}`
    dadosProximos[3].innerText = `Temperatura máxima: ${tempMax}`
    dadosProximos[4].innerText = `Temperatura mínima: ${tempMin}`
  }

  if(localStorage.getItem("dia4")){
    let d = JSON.parse(localStorage.getItem("dia4"));
    
    

    let dadosProximos = document.getElementsByClassName("dadosProximos");

  
    let {dia, diaData, cidade, resumo, tempMax, tempMin } = d;
  
  
    dadosProximos[5].innerText = `${dia} - ${diaData}`
    dadosProximos[6].innerText = `${cidade}`
    dadosProximos[7].innerText = `${resumo}`
    dadosProximos[8].innerText = `Temperatura máxima: ${tempMax}`
    dadosProximos[9].innerText = `Temperatura mínima: ${tempMin}`
  }

  if(localStorage.getItem("dia5")){
    let e = JSON.parse(localStorage.getItem("dia5"));
    
    

    let dadosProximos = document.getElementsByClassName("dadosProximos");

  
    let {dia, diaData, cidade, resumo, tempMax, tempMin } = e;
  
  
    dadosProximos[10].innerText = `${dia} - ${diaData}`
    dadosProximos[11].innerText = `${cidade}`
    dadosProximos[12].innerText = `${resumo}`
    dadosProximos[13].innerText = `Temperatura máxima: ${tempMax}`
    dadosProximos[14].innerText = `Temperatura mínima: ${tempMin}`
  }
}

