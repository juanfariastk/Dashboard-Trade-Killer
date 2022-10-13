
//função para consumir API com um array
const cripto_moedas = async (lista = []) => {
  const lista_reposta = []
  for await (let id_moeda of lista) {
    const url_btc = `https://www.mercadobitcoin.net/api/${id_moeda}/ticker/`

    let resposta = await fetch(url_btc)
    let resposta2 = await resposta.json()
    lista_reposta.push(resposta2.ticker)
  }

  return lista_reposta.map(item => item.last)

}

//função para consumir uma API com uma string
const cripto_moeda = async (id_moeda) => {

  const url_btc = `https://www.mercadobitcoin.net/api/${id_moeda}/ticker/`

  let resposta = await fetch(url_btc)
  let resposta2 = await resposta.json()
  return resposta2.ticker

}


//variaveis para grafico
let array_compra = []
let moedas = []
let quantidades_compradas = []
const moedas_classicas = ['BTC', 'BCH', 'ETH', 'LTC', 'AAVE']

const div_error = document.querySelector('#erro_fim')
const div_graf_compra = document.querySelector("#grafico_compra")
const div_compra_graf_1 = document.querySelector("#compra_graf_1")

const div_prob_graf = document.querySelector("#grafico_crescimento")
const div_tot_graf = document.querySelector("#valor_graf")
const div_graf_prob_fim = document.querySelector("#prob_graf")
const div_footer_fim = document.querySelector("footer")

const parag_total = document.querySelector("#total_gasto")


//alterando paragrafo

//erros possiveis 
const erro_form = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Selecione os campos corretamente!</strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`
const erro_form_cheio = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Já escolheu o máximo para o seu Plano!</strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`


//variavel de data
const data = new Date();
const dia = String(data.getDate()).padStart(2, '0');
const mes = String(data.getMonth() + 1).padStart(2, '0');
const ano = data.getFullYear();
let data_atual = dia + '/' + mes + '/' + ano;


//variáveis dos cards 

//cards pós-gráfico
const investimento_mes = document.querySelector('#valor_investimentos_mensal')
const investimento_anual = document.querySelector('#valor_investimentos_anual')
const propostas_disponivel = document.querySelector('#propostas_abertas')

//cards seguintes
const paragrafo_mercado = document.querySelector('#p_desc_mercado')

//valores dos cards
const investimento_mes_valor = '1300.0'
const investimento_anual_valor = '115.000'
const propostas_numeros = 3
const paragrafo_text= `O mercado hoje ${data_atual} está com baixas notícias nos principais índices, porém vale a ressaltar uma análise de fluxo do mercado com relação as notícias do dia.`
//teste valores dos cards

investimento_mes.textContent=`R$ ${investimento_mes_valor}`
investimento_anual.textContent=`R$ ${investimento_anual_valor}`
propostas_disponivel.textContent=`${propostas_numeros}`
paragrafo_mercado.textContent=`${paragrafo_text}`


//graficos charts.js

//função que recolhe os valores de um form
function compra_moeda() {
  const moeda_comprada = document.querySelector('#moedas_compra')
  const quantidade_comprada = document.querySelector('#quantidade_compra')
  let objeto_fim = { moeda: moeda_comprada.value, quantidade: quantidade_comprada.value }

  if (moeda_comprada.value === 'Escolha uma moeda para comprar' || quantidade_comprada.value === 'Escolha uma quantidade') {
    div_error.innerHTML = erro_form
    
  }

  return objeto_fim

}

//
function criar_grafico(array_desc, array_dados, id_canva) {
  new Chart(document.querySelector(`#${id_canva}`), {
    type: 'bar',
    data: {
      labels: array_desc,
      datasets: [
        {
          label: "Valor mais alto",
          backgroundColor: ["#9EFCEB", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          data: array_dados
        }
      ]
    },
    options: {
      responsive: true,
    }
  })
}

//função que gera um gráfico em qualquer div, porém possui parametros especificos ao gerar
function criar_grafico_especial(array_desc, array_dados, array_quantidade, id_canva) {
  new Chart(document.querySelector(`#${id_canva}`), {
    type: 'doughnut',
    data: {
      labels: array_desc,
      datasets: [{
        label: array_desc,
        data: [parseFloat(array_dados[0] * array_quantidade[0]).toFixed(3), parseFloat(array_dados[1] * array_quantidade[1]).toFixed(3), parseFloat(array_dados[2] * array_quantidade[2]).toFixed(3)],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
        borderWidth: 1
      }
    ,
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  })
}

//função que gera um gráfico na div especificada
function gerar_grafico_compra(array) {
  var grafico_compra_1 = new Chart(div_graf_compra, {
    type: 'line',
    data: {
      labels: [array[0].moeda, array[1].moeda, array[2].moeda],
      datasets: [{
        label: 'Volume Comprado',
        data: [array[0].quantidade, array[1].quantidade, array[2].quantidade],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      
      //cutoutPercentage: 30,
      responsive: true,

    }
  });
}

////função que gera um gráfico na div especificada
function gerar_grafico_crescimento(array_label, array_valor) {
  var grafico_compra_1 = new Chart(div_prob_graf, {
    type: 'line',
    data: {
      labels: [array_label[0].moeda, array_label[1].moeda, array_label[2].moeda],
      datasets: [{
        label: 'Crescimento previsto',
        data: [array_valor[0], array_valor[1], array_valor[2]],
        backgroundColor: [
          'rgba(136, 99, 255, 0.5)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(136,99,255,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      //cutoutPercentage: 30,
      responsive: true,

    }
  });
}

//grafico index
cripto_moedas(moedas_classicas).then(dados => {
  criar_grafico(moedas_classicas, dados, 'grafico_1')
})



//ações para gerar o gráfico


function efetua_compra(event) {

  event.preventDefault()

  let compra_atual = compra_moeda()

  if (array_compra.length < 3) {
    array_compra.push(compra_atual)
    moedas.push(compra_atual.moeda)
    quantidades_compradas.push(compra_atual.quantidade)
  } else {
    cripto_moedas(moedas).then(dados => {
      criar_grafico_especial(moedas, dados, quantidades_compradas, 'grafico_valor_gasto')
      let media_final= parseFloat(((parseFloat(dados[0] * parseInt(quantidades_compradas[0])).toFixed(3)) + (parseFloat(dados[1] * parseInt(quantidades_compradas[1])).toFixed(3)) + (parseFloat(dados[2] * parseInt(quantidades_compradas[2])).toFixed(3))/3)).toFixed(3)
      parag_total.textContent = ' Média de capital investido: ' + media_final
    })
    cripto_moedas(moedas).then(dados =>{
      gerar_grafico_crescimento(array_compra, dados)
    })
    gerar_grafico_compra(array_compra)
    div_error.innerHTML = erro_form_cheio
    div_compra_graf_1.classList.remove("d-none")
    div_graf_prob_fim.classList.remove("d-none")
    div_tot_graf.classList.remove("d-none")
    div_footer_fim.classList.remove("d-none")
  }

}



  