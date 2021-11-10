let url1 =
  "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome";
let data = new Date();

let dataHoje = `${("00" + data.getDate()).slice(-2)}/${
  data.getMonth() + 1
}/${data.getFullYear()}`;

function pegarCidade() {
  let nomeCidade = document.getElementById("nomeCidade").value;

  fetch(url1)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.find((city) => city.nome == nomeCidade) == undefined) {
        alert("Digite corretamente o nome da cidade");
        return;
      }
      let cidade = data.find((city) => city.nome == nomeCidade).id;
      cidadePrevisao(cidade);
    });
}

function cidadePrevisao(cidade) {
  let url2 = "https://apiprevmet3.inmet.gov.br/previsao/" + cidade.toString();
  fetch(url2)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let hojeManha = data[cidade][`${dataHoje}`].manha;
      let hojeTarde = data[cidade][`${dataHoje}`].tarde;
      let hojeNoite = data[cidade][`${dataHoje}`].noite;

      console.log(data[cidade][`${dataHoje}`].manha.resumo); // Preciso agora transformar em uma função que mostrará no HTML
    });
}

function criarDiv() {}
