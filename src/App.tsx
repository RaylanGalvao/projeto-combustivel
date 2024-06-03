import { useState, FormEvent } from 'react'
import './App.css'

import logoImg from './assets/logo.png'

interface infoProps{
  title: string
  gasolina: string | number
  alcool: string | number

}

/*
calculo :alcool / gasolina
e se o resultado for menor que 0.7 compensa usar o alcool
*/

function App() {

  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)
  const[info, setInfo]=useState<infoProps>()
  
  function calcular(event: FormEvent){

    event.preventDefault()

    let calculo = (alcoolInput/gasolinaInput)
    console.log(calculo)
    if(calculo <= 0.7){
      setInfo({
        title:"compensa usar alccol",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    }else{
      setInfo({
        title:"compensa usar gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    }
  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br",
      {
        style: "currency",
        currency: "BRL"
      }
    )
    return valorFormatado
  }

  return (
      <div>
        <main className='conteiner'>
          <img className='logo'
           src={logoImg} alt="logo da calculadora de gasolina ou alcool" />
          <h1 className='title'>qual a melhor opção</h1>

          <form className='form' onSubmit={calcular}>

            <label>Alcool (preço por litro)</label>
            <input 
            className='input' 
            type='number' 
            placeholder='4.9'
            min="1"
            step={0.01}
            required
            value={alcoolInput}
            onChange={(e)=>setAlcoolInput(Number(e.target.value))}
            />

            <label>Gasolina (preço por litro)</label>
            <input 
            className='input' 
            type='number' 
            placeholder='4.9'
            min="1"
            step={0.01}
            required
            value={gasolinaInput}
            onChange={(e)=>setGasolinaInput(Number(e.target.value))}
            />

          <input className='button' type="submit" value="calcular"/>
          </form>
          {info && Object.keys(info).length>0 && (
          <section className='result'>
            <h2 className='result-title'>{info.title}</h2>
            <span>Alcool R$ {info.alcool}</span>
            <span>Gasolina R$ {info.gasolina}</span>
          </section>
          )}
        </main>
      </div>
  )
}

export default App
