//criando o 2 gráfico trading view

new TradingView.widget(
    {
    "width": 880,
    "height": 610,
    "symbol": "FRED:SP500",
    "interval": "5",
    "timezone": "America/Sao_Paulo",
    "theme": "Dark",
    "style": "1",
    "locale": "in",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "hide_top_toolbar": true,
    "allow_symbol_change": true,
    "studies": [
      "RSI@tv-basicstudies"
    ],
    "container_id": "tradingview_chart2"
  }
    );

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


  