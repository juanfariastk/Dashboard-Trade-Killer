var sym = exchangeInfo.symbols,markup='';
sym.forEach(d => {
    markup += '<option value="' + d.symbol + '">' + d.symbol + '</option>';
});
document.getElementById('pares').innerHTML = markup;
  
carregar_grafico();    
function carregar_grafico(){
    let id_par = document.getElementById('pares').value;
    
    new TradingView.widget(
      {
    "width": 880,
    "height": 579,
    "symbol": "BINANCE:" + id_par,
    "interval": "5",
    "timezone": "America/Sao_Paulo",
    "theme": "Light",
    "style": "1",
    "locale": "in",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "allow_symbol_change": true,
    "container_id": "tradingview_chart1"
    });
}