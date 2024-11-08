import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <app> <div className="green-belt">
      <h1 id="app-name">Fitolongo</h1>
    </div>
      <div className="container">
        <div className="box" id="kalendarz">
          <h1 className="header">Kalendarz łasucha</h1>
          <p>
            Licz kalorie i kontroluj nawodnienie, <br />
            aby masa nie spadła
          </p>
          <img
            src="./images/undraw_breakfast_psiw.svg"
            alt="Food"
            className="image"
          />
        </div>
        <div className="box" id="cwiczenia">
          <h1 className="header">
            Co zrobić, żeby <br />chude szczury były w strachu
          </h1>
          <p>
            Sprawdź jakie ćwiczenia wykonywać,<br />
            aby na dyskotece wygrać każdą cepeliadę.
          </p>
          <img
            src="./images/undraw_healthy_habit_kwe6.svg"
            alt="Big boy training"
            className="image"
          />
        </div>
        <div className="box" id="trenerzy">
          <h1 className="header">
            Oni zrobią z ciebie <br />
            Wielkiego Chłopa
          </h1>
          <p>
            To tutaj zobaczysz kto może ci pomóc <br />
            w drodze po marzenia, aby stać na czele łańcucha pokarmowego!
          </p>
          <img
            src="./images/undraw_personal_trainer_re_cnua.svg"
            alt="Personal trainer"
            className="image"
          />
        </div>
      </div>
      <footer className="green-belt" id="footer">
        Stań się Wielki, spraw by chude szczury były w strachu
      </footer></app>
  )
}

export default App
