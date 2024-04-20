const questions = [
    {
        question: "Як розшифровується HTML?",
        answers: [
        "HyperText Markup Language", 
        "HyperTransform Mark Language", 
        "High Technic Module Last", 
        "High Top Mask List",
        ],
        correct: 1,
    },

    {
        question: "Як розшифровується CSS?",
        answers: [
        "Capital Sort Sheets", 
        "Cascading Style Sheets", 
        "Corner Solid Sheets", 
        "Computer Style Sheets",
        ],
        correct: 2,
    },

    {
        question: "Що таке JavaScript?",
        answers: [
        "Фреймворк", 
        "Програма для організації файлів проекту", 
        "Мова програмування",
        "Програма для тестування проекту",
        ],
        correct: 3,
    },

    {
        question: "Що таке JSON?",
        answers: [
        "Бібліотека для JavaScript", 
        "Програма для включення локального сервера", 
        "Файл підключення JavaScript-файлів",
        "Текстовий формат обміну даними між комп'ютерами",
        ],
        correct: 4,
    },

    {
        question: "Що з переліченого використовується для написання структури веб-сторінки?",
        answers: [
        "HTML", 
        "NodeJS", 
        "Python",
        "JavaScript",
        ],
        correct: 1,
    },
]

// Отримуємо доступ до елементів на сторінці
const headerContainer = document.querySelector('#quizHeader');
const listContainer = document.querySelector('#quizList');
const submitBtn = document.querySelector('#submit');

// Змінні для вікторини
let score = 0; // Лічильник балів за правильні відповіді
let questionIndex = 0; // Індекс поточного питання для рендеру

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

// --------------------ФУНКЦІЇ--------------------//
// Функція очистки HTML-вмісту блоків, з якими працюємо
function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

// Функція відображення питання та відповідей в блоці
function showQuestion() {
    const headerTemplate = `<h3 class="quiz__title">%title%</h3>`
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

    headerContainer.innerHTML = title;
    
    for(answerText of questions[questionIndex]['answers']) {
        const answerIndex = questions[questionIndex]['answers'].indexOf(answerText) + 1;
        const questionTemplate = `<li class="quiz__item">
                                        <label>
                                            <input value = '%number%' type="radio" class="quizz__answer" name="answer">
                                            <span>%answer%</span>
                                        </label>
                                  </li>`;
        
        
        const answerHTML = questionTemplate
                                        .replace('%answer%', answerText)
                                        .replace('%number%', answerIndex);
        listContainer.insertAdjacentHTML('beforeend', answerHTML);
    }
}

// Функція перевірки вибору користувача
function checkAnswer() {
    // Знаходимо вибрану радіо-кнопку
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

    // Перевірка чи обрав користувач якусь відповідь
    if(!checkedRadio) {
        submitBtn.blur(); //Виводимо кнопку із фокусу
        alert('Оберіть варіант відповіді!'); 
        return;
    }

    // Дізнаємося номер відповіді користувача
    const userAnswer = parseInt(checkedRadio.value);

    // Якщо відповідь вірна - збільшуємо рахунок
    if(userAnswer === questions[questionIndex]['correct']) {
        score++;
    } 

    // Перевірка, чи питання було останнім
    if(questionIndex !== questions.length - 1) {
        questionIndex++;

        clearPage();
        showQuestion();
        return;
    } else {
        clearPage();
        showResults();
    }
}

// Функція для відображення результатів вікторини
function showResults() {
    const resultsTemplate = `
                                <h4 class="quiz__result-title">%result-title%</h4>
                                <div class="quiz__result-score">Результат: %result-score%</div>
                                <div class="quiz__result-message">%result-message%</div>
    `;

    let title, message;

    // Варіанти тексту та заголовка, залежно від результату вікторини
    if(score === questions.length) {
        title = 'Вітання!';
        message = 'Ви відповіли на всі питання правильно!';
    } else if((score*100)/questions.length >= 50) {
        title = 'Добре!';
        message = 'Ви відповіли на більш ніж половину відповідей правильно!';
    } else  {
        title = 'Спробуйте знову!';
        message = 'Ви не відповіли на достатню кількість питань правильно. Попрацюйте з матеріалом і спробуйте знову!';
    }

    // Результат
    let result = `${score} із ${questions.length}`;

    let finalMessage = resultsTemplate.replace('%result-title%', title)
                            .replace('%result-score%', result)
                            .replace('%result-message%', message);

    headerContainer.innerHTML = finalMessage;

    // Змінюємо кнопку
    submitBtn.blur();
    submitBtn.innerText = 'Грати знову'
    submitBtn.onclick = ()=>{history.go()}; // Оновлюємо сторінку при натисканні
};