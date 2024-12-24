import { useEffect, useState } from 'react'
import './styles/styles.css'

function App() {
  const [symbols, setSymbols] = useState('abcdefghijklmnopqrstuvwxyz')
  const [isCopied, setIsCopied] = useState(false)
  const [checkboxes, setCheckboxes] = useState({
    upperCase: false,
    numbers: false,
    special: false
  })
  const [inputValue, setInputValue] = useState(10)
  const [password, setPassword] = useState('')

  useEffect(() => {
    const upperCaseSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberSymbols = '1234567890'
    const specialSymbols = '/%$#@*^!-_+=;:|'

    setSymbols(prev => {
      let actualState = prev

      if(checkboxes.upperCase) {
        if(!actualState.includes(upperCaseSymbols)) {
          actualState += upperCaseSymbols
        }
      } else {
        actualState = actualState.replace(upperCaseSymbols, '')
      }

      if(checkboxes.numbers) {
        if(!actualState.includes(numberSymbols)) {
          actualState += numberSymbols
        }
      } else {
        actualState = actualState.replace(numberSymbols, '')
      }

      if(checkboxes.special) {
        if(!actualState.includes(specialSymbols)) {
          actualState += specialSymbols
        }
      } else {
        actualState = actualState.replace(specialSymbols, '')
      }

      return actualState
    })
  }, [checkboxes])

  function toggleUpperCase() {
    setCheckboxes(previous => ({
      ...previous,
      upperCase: !previous.upperCase
    }))
  }

  function toggleNumbers() {
    setCheckboxes(previous => ({
      ...previous,
      numbers: !previous.numbers
    }))
  }

  function toggleSpecialSymbols() {
    setCheckboxes(previous => ({
      ...previous,
      special: !previous.special
    }))
  }

  function generate() {

    function getRandom(min, max) {
      return (Math.floor(Math.random() * (max - min) + min))
    }

    let result = ''

    for(let i = 0; i < inputValue; i++) {
      const randomIndex = getRandom(0, symbols.length)
      result += symbols.charAt(randomIndex)
    }

    setIsCopied(false)
    setPassword(
      <div onClick={handleCopy} id='result' className='generator__result'>
        {result}
      </div>
    )
  }

  function handleCopy() {
    const textToCopy = document.getElementById('result').innerText

    navigator.clipboard.writeText(textToCopy)
    .then(() => {
      setIsCopied(true)
    })
  }

  return (
    <>
    <main>
      <section className='generator'>

        <h1 className='title'>Генератор паролей</h1>

        <p>Длина пароля:</p>

        <p><span className='length'>{inputValue}</span> символов</p>

        <input 
          onInput={(e) => setInputValue(e.target.value)} 
          value={inputValue} 
          className='generator__range' 
          step="1" 
          min="5" 
          max="20" 
          type="range" />

        <p>Добавить:</p>

        <div className="generator__checkboxes">
          <div className="generator__checkboxes__item">
            <button
            id='upperCase' 
            onClick={toggleUpperCase} 
            className={checkboxes.upperCase ? 'checkbox active' : 'checkbox'}>
              <svg fill='white' viewBox="0 0 26 26" width="17px" height="17px"><path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"/></svg>
            </button>
            Прописные буквы 
          </div>
          <p className='symbols-demo'>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>

          <div className="generator__checkboxes__item">
            <button 
            id='numbers'
            onClick={toggleNumbers} 
            className={checkboxes.numbers ? 'checkbox active' : 'checkbox'}>
              <svg fill='white' viewBox="0 0 26 26" width="17px" height="17px"><path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"/></svg>
            </button>
            Цифры 
          </div>
          <p className='symbols-demo'>1234567890</p>

          <div className="generator__checkboxes__item">
            <button 
            id='special'
            onClick={toggleSpecialSymbols} 
            className={checkboxes.special ? 'checkbox active' : 'checkbox'}>
              <svg fill='white' viewBox="0 0 26 26" width="17px" height="17px"><path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"/></svg>
            </button>
            Спецсимволы
          </div>
          <p className='symbols-demo'>/%$#@*^!-_+=;:|</p>
        </div>

        <button onClick={generate} className="generator__create">Сгенерировать</button>

        {password}
        {isCopied ? <p className='copied'>Скопировано!</p> : null}
      </section>
    </main>
    </>
  )
}

export default App
