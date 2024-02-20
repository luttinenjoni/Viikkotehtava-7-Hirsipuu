const input = document.querySelector('input')
const output = document.querySelector('output')
const guessCountSpan = document.getElementById('guessCount') // Lisätty spanin haku
const words = [
    "ohjelmointi",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
]

let randomizedWord = ''
let maskedWord = ''
let guessCount = 0 // Lisätty arvausten laskuri

const newGame = () => {
    const random = Math.floor(Math.random() * 10) // Korjattu numeron generointi, jotta se olisi välillä 0-9
    randomizedWord = words[random]
    maskedWord = "*".repeat(randomizedWord.length)
    guessCount = 0 // Nollataan arvausten laskuri uuden pelin alussa
    console.log(randomizedWord)
    output.innerHTML = maskedWord
}

const win = () => {
    alert(`Olet arvannut oikein, sana oli ${randomizedWord}. Arvaustesi määrä oli ${guessCount}.`)
    newGame()
}

const replaceFoundChars = (guess) => {
    guessCount++ // Lisätään arvauksen määrään yksi joka kerta, kun käyttäjä arvaa
    guessCountSpan.textContent = guessCount; // Päivitetään arvausten määrä näytössä
    for (let i = 0;i<randomizedWord.length;i++) {
        const char = randomizedWord.substring(i,i+1)
        if (char === guess) {
            let newString = maskedWord.split('')
            newString.splice(i,1,guess)
            newString = newString.join('')
            maskedWord = newString
        }
    }
    output.innerHTML = maskedWord
}

newGame()

input.addEventListener('keypress',(e) => { 
    if (e.key === 'Enter') {
        e.preventDefault()

        const guess = input.value
        if (guess.toLowerCase() === randomizedWord.toLowerCase()) {
            win()
        } else if (guess.length === 1) { 
          replaceFoundChars(guess)
          if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
                win()
            }
        } else {
            alert("You guessed wrong!")
        }
        input.value=''
    }
})