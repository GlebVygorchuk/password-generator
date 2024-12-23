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

    document.getElementById('result').innerHTML = result
    setIsCopied(false)
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

        <p>Настройте количество символов:</p>

        <div className="generator__inputs">
          <input
          onInput={(e) => setInputValue(e.target.value)} 
          value={inputValue} 
          className="generator__symbols-amount" 
          type="number"
          readOnly
          min="4" 
          max="30" />

          <input 
          onInput={(e) => setInputValue(e.target.value)} 
          value={inputValue} 
          className='generator__range' 
          step="1" 
          min="4" 
          max="20" 
          type="range" />
        </div>

        <div className="generator__checkboxes">
          <div className="generator__checkboxes__item">
            <button
            id='upperCase' 
            onClick={toggleUpperCase} 
            className={checkboxes.upperCase ? 'checkbox active' : 'checkbox'}>
              <svg fill='white' viewBox="0 0 26 26" width="17px" height="17px"><path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"/></svg>
            </button>
            Добавить прописные буквы 
          </div>
          <p className='symbols-demo'>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>

          <div className="generator__checkboxes__item">
            <button 
            id='numbers'
            onClick={toggleNumbers} 
            className={checkboxes.numbers ? 'checkbox active' : 'checkbox'}>
              <svg fill='white' viewBox="0 0 26 26" width="17px" height="17px"><path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"/></svg>
            </button>
            Добавить цифры 
          </div>
          <p className='symbols-demo'>1234567890</p>

          <div className="generator__checkboxes__item">
            <button 
            id='special'
            onClick={toggleSpecialSymbols} 
            className={checkboxes.special ? 'checkbox active' : 'checkbox'}>
              <svg fill='white' viewBox="0 0 26 26" width="17px" height="17px"><path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"/></svg>
            </button>
            Добавить спецсимволы
          </div>
          <p className='symbols-demo'>/%$#@*^!-_+=;:|</p>
        </div>

        <div className="generator__buttons">
          <button onClick={generate} className="generator__buttons_create">Сгенерировать</button>

          <div className="generator__buttons_container">
            <div id='result' className="generator__buttons_container_result"></div>
            <div onClick={handleCopy} className="generator__buttons_container_copy">
              <svg fill="#FFFFFF" height="35px" width="35px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g id="Text-files">
	<path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228
		C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999
		c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64
		h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002
		C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228
		c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999
		c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z
		 M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699
		c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946
		c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999
		h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"/>
	<path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005
		c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997
		C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"/>
	<path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986
		c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016
		C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"/>
	<path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
		s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997
		S39.16465,29.4603004,38.6031494,29.4603004z"/>
	<path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
		s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997
		S29.0059509,37.5872993,28.4444485,37.5872993z"/>
</g>
              </svg></div>
            </div>
        </div>
        {isCopied ? <p className='copied'>Скопировано!</p> : null}
      </section>
    </main>
    </>
  )
}

export default App
