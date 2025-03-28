import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const API_URL="https://api.exchangerate-api.com/v4/latest/";
function App() {

  const [amount,setAmount]=useState("");
  const [fromCurrency,setFromCurrency]=useState("USD");
  const [toCurrency,setToCurrency]=useState("INR");
  const [exchangeRates,setExchangeRates]=useState({});
  const [convertAmount,setconvertAmount]=useState(null);
  const inputRef=useRef();

  useEffect(() => {
    fetch(`${API_URL}${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => setExchangeRates(data.rates)) // Updated setter name
      .catch((err) => console.log("Failed to fetch"));
  }, [fromCurrency]);

  useEffect(()=>{
    inputRef.current.focus();
  },[]);

  const availableCurrencies=useMemo(
    ()=>Object.keys(exchangeRates),
    [exchangeRates]
  );

  const convert=useCallback(()=>{
    if(exchangeRates[toCurrency])
    {
      const rate=exchangeRates[toCurrency];
      setconvertAmount((amount*rate).toFixed(2));
    }
  },[amount,toCurrency,exchangeRates]);

  return (
    <div className="App">
      <h1>Currency converter</h1>
      <div>
        <input type="number" ref={inputRef} value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        <select value={fromCurrency}
        onChange={(e)=>setFromCurrency(e.target.value)}>
        {availableCurrencies.map((cur)=>(
          <option key={cur} values={cur}>{cur}</option>
        ))}</select>

        <span>to</span>

        <select value={toCurrency}
        onChange={(e)=>setToCurrency(e.target.value)}>
        {availableCurrencies.map((cur)=>(
          <option key={cur} values={cur}>{cur}</option>
        ))}</select>
        <button onClick={convert}>Convert</button>
        {
          convertAmount&&(
            <h2>{amount} {fromCurrency}={convertAmount} {toCurrency}</h2>
          )
        }
      </div>
    </div>
  );
}

export default App;
