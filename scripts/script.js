let url1 =
  "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome";

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
      cidadePrevisao(cidade.toString());
    });
}

function cidadePrevisao(cidade) {
  let url2 = "https://apiprevmet3.inmet.gov.br/previsao/" + cidade;
  fetch(url2)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

function criarDiv(){

}