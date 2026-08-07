const questions = document.querySelectorAll('.question-container');
const STORAGE_KEY = 'openedAccordion';

questions.forEach((question, index) => {
    question.addEventListener('click', () => {
        if (isOpened(question)) {
            hideAnswer(question);
            localStorage.removeItem(STORAGE_KEY);
        } else {
            questions.forEach((questionItem) => hideAnswer(questionItem));
            openAnswer(question);
            localStorage.setItem(STORAGE_KEY, index);
        }
    })
});

restoreAccordion();

function hideAnswer(questionContainer) {
    if (isOpened(questionContainer)) {
        const answerContainer = questionContainer.nextElementSibling;
        answerContainer.classList.remove('open');
        questionContainer.classList.remove('open');
    }
}

function openAnswer(questionContainer) {
    if (!isOpened(questionContainer)) {
        const answerContainer = questionContainer.nextElementSibling;
        answerContainer.classList.toggle('open');
        questionContainer.classList.toggle('open');
    }
}

function isOpened(questionContainer) {
    return questionContainer.classList.contains('open');
}

function restoreAccordion() {
    console.log("restore")
    let savedQuestionIndex = localStorage.getItem(STORAGE_KEY);

    if (savedQuestionIndex == null || !isFinite(savedQuestionIndex) || savedQuestionIndex > questions.length - 1) {
        savedQuestionIndex = 0;
    }

    console.log(savedQuestionIndex);

    const question = questions[savedQuestionIndex];

    if (question) {
        openAnswer(question);
    }
}