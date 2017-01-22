var inquirer = require('inquirer');
var basic = require('./basic.js');
var fs = require('fs');

inquirer.prompt({
    type: "list",
    name: "command",
    message: "What would you like to do?",
    choices: [
        { name: "Add a flashcard" },
        { name: "Show all flashcards" }
    ]

}).then(function(answers) {
    if (answers.command === "Add a flashcard") {
        addcard();
    } else if (answers.command === "Show all flashcards") {
        readcards();
    }
});

function addcard() {
    inquirer.prompt([{
        name: "front",
        message: "What is the question?",

    }, {
        type: "input",
        name: "back",
        message: "What is the answer?",
    }]).then(function(answers) {
        var newBasic = new basic(answers.front, answers.back);
        newBasic.add();
        console.log("Question and answer has been added!")

    })
}

function readcards() {

    fs.readFile("allcards.txt", 'utf8', function(error, data) {

            if (error) {
                console.log(error);
            }
            var questions = data.split(';');
            var notBlank = function(value) {
                return value;
            };
            questions = questions.filter(notBlank);
            var count = 0;
            showQuestion(questions, count);

        }

    )
}

var showQuestion = function(array, index) {
    question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctReponse;
    questionText = parsedQuestion.front;
    correctReponse = parsedQuestion.back;


 inquirer.prompt([{
        name: 'response',
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctReponse) {
            console.log('Correct!');
            if (index < array.length - 1) {
              showQuestion(array, index + 1);
            }
        } else {
            console.log('Wrong!');
            if (index < array.length - 1) {
              showQuestion(array, index + 1);
            }
        }
    });
}