const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
    question: '¿Quién es el autor de la frase "Pienso, luego existo"?',
    choice1: 'Platón',
    choice2: 'Galileo Galilei',
    choice3: 'Descartes',
    choice4: 'Francis Bacon',
    answer: 3,
}, {
    question: '¿Cuál es el país más grande y el más pequeño del mundo?',
    choice1: 'Rusia y Vaticano',
    choice2: 'China y Nauru',
    choice3: 'Canadá y Mónaco',
    choice4: 'Estados Unidos y Malta',
    answer: 1,
}, {
    question: '¿Cuál es el libro más vendido en el mundo después de la Biblia?',
    choice1: 'El Señor de los Anillos',
    choice2: 'Don Quijote de la Mancha',
    choice3: 'El Principito',
    choice4: 'Cien años de Soledad',
    answer: 2,
}, {
    question: '¿Cuántos decimales tiene el número pi π?',
    choice1: 'Dos',
    choice2: 'Infinitos',
    choice3: 'Mil',
    choice4: 'Veinte',
    answer: 2,
},{
    question: '¿Cuántos jugadores por equipo participan en un partido de voleibol?',
    choice1: '2 jugadores',
    choice2: '3 jugadores',
    choice3: '6 jugadores',
    choice4: '5 jugadores',
    answer: 3,
},{
    question: '¿Quién pintó la obra "Guernica"?',
    choice1: 'Paul Cézanne',
    choice2: 'Diego Rivera',
    choice3: 'Salvador Dalí',
    choice4: 'Pablo Picasso',
    answer: 4,
},{
    question: '¿Cuánto tiempo tarda la luz del Sol en llegar a la Tierra?',
    choice1: '12 minutos',
    choice2: '12 horas',
    choice3: '1 día',
    choice4: '8 minutos',
    answer: 4,
},{
    question: '¿Cuál es la altura de la red de voleibol en los juegos masculino y femenino?',
    choice1: '2,4 m para ambos',
    choice2: '2,43 m y 2,24 m',
    choice3: '1,8 m y 1,5 m',
    choice4: '2,45 m y 2,15 m',
    answer: 2,
},{
    question: '¿En qué orden se presentaron los modelos atómicos?',
    choice1: 'Thomson, Dalton, Rutherford, Bohr',
    choice2: 'Dalton, Thomson, Rutherford, cuántico',
    choice3: 'Bohr, Rutherford, cuántico, Einstein',
    choice4: 'Rutherford, Dalton, Thomson, cuántico',
    answer: 2,
},{
    question: '¿A quién se le atribuye la frase "Solo sé que no sé nada"?',
    choice1: 'Aristóteles',
    choice2: 'Nietszche',
    choice3: 'Sófocles',
    choice4: 'Sócrates',
    answer: 4,
}, ]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter === MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/fin.html')
    }

    questionCounter++
    progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choices => {
    choices.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct' ){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)

    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame();
