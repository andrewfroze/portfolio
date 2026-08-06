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

        const accordionSign = questionContainer.querySelector('.accordion-sign svg');
        accordionSign.classList.remove('minus-icon');
        accordionSign.classList.toggle('plus-icon');

        const use = accordionSign.querySelector('use');
        use.setAttribute('href', 'images/faq/icons.svg#plus');
    }
}

function openAnswer(questionContainer) {
    if (!isOpened(questionContainer)) {
        const answerContainer = questionContainer.nextElementSibling;
        answerContainer.classList.toggle('open');

        const accordionSign = questionContainer.querySelector('.accordion-sign svg');
        accordionSign.classList.remove('plus-icon');
        accordionSign.classList.toggle('minus-icon');

        const use = accordionSign.querySelector('use');
        use.setAttribute('href', 'images/faq/icons.svg#minus');
    }
}

function isOpened(questionContainer) {
    const answerContainer = questionContainer.nextElementSibling;
    return answerContainer.classList.contains('open');
}

function restoreAccordion() {
    console.log("restore")
    const savedQuestionIndex = localStorage.getItem(STORAGE_KEY);

    if (!Number.isInteger(savedQuestionIndex)) {
        savedQuestionId = 0;
    }

    const index = savedQuestionIndex;

    console.log(index);

    const question = questions[index];

    if (question) {
        openAnswer(question);
    }
}