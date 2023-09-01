/* eslint-disable no-useless-concat */
/* eslint-disable operator-linebreak */
import readline from 'node:readline/promises';
import process from 'node:process';
import fs from 'node:fs';

const questions = JSON.parse(fs.readFileSync('./question.json', 'utf-8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const write = str => {
  process.stdout.write(str);
};

const clear = () => {
  write('\x1Bc');
};

let questIndex;
let answersCount;

questIndex = answersCount = 0;

const answersIndexes = [];

const showProgress = () => {
  console.log(`Вопрос: ${questIndex < questions.length
    ? questIndex + 1
    : questions.length} / ${questions.length}`);

  let i = 0;

  for (i; i < questIndex; i++) {
    if (answersIndexes.includes(i)) {
      write('\x1b[42m \x1b[0m');
    } else {
      write('\x1b[41m \x1b[0m');
    }
  }

  for (let j = i + 1; j <= questions.length; j++) {
    write('\x1b[47m \x1b[0m');
  }

  console.log();
};

const showMessage = message => {
  showProgress();
  console.log(message);
};

const showResults = () => {
  console.log('\nФиниш!');
  console.log('Верных ответов: ' + `${answersCount}/${questions.length}`);
  rl.close();
};

function checkResults(answer) {
  const currentQuestion = questions[questIndex];

  if (isNaN(answer) || answer < 0 || answer > currentQuestion.options.length) {
    showMessage('Ответ некорректный! Жми сильнее кнопку!');
    askQuestion();
    return;
  }

  questIndex++;

  if (+answer === currentQuestion.correctIndex + 1) {
    answersCount++;
    answersIndexes.push(questIndex - 1);
    showMessage('Верный ответ!');
  } else {
    showMessage('Неверный ответ!');
  }

  if (questIndex < questions.length) {
    askQuestion();
  } else {
    showResults();
  }
}

async function askQuestion() {
  const currentQuestion = questions[questIndex];
  console.log(`\n${currentQuestion.question}`);

  console.log('\nВарианты ответов:');

  currentQuestion.options.forEach((option, index) => {
    console.log(index + 1 + '. ' + option);
  });

  const answer = await rl.question('\x1b[35m\nТвой ответ: \x1b[0m');

  clear();

  checkResults(answer);
}

clear();
console.log('Привет! Это вопросы по JavaScript');
console.log('Чтобы ответить введи номер варианта и нажми Enter');
console.log('Жми Enter, чтобы начать');

rl.once('line', () => {
  clear();
  showProgress();
  askQuestion();
});
