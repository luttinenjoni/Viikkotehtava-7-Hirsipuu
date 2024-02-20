const input = document.querySelector('input')
const output = document.querySelector('output')
const span = document.querySelector('span')

const words = [
    "ohjelmointi",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "liberary",
    "asynchronous",
    "hypertext"
]

let randomizedWord = ''
let maskedWord = ''

const newGame = () => {
    const random = Math.floor(Math.random() * 10) + 1
    randomizedWord = words[random]
    maskedWord = "*".repeat(randomizedWord.length)
    console.log(randomizedWord)
    output.innerHTML = maskedWord
} 

const win = () => {
    alert(`Olet arvannut oikein, sana oli ${randomizedWord}.`)
    newGame()
}

const replaceFoundChars = (guess) => {
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
          if (maskedWord.toLocaleLowerCase() === randomizedWord.toLocaleLowerCase()) {
                win()
            }
        } else {
            alert("You guessed wrong!")
        }
        input.value=''
    }
})