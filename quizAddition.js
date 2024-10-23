
    // Global variables to keep track of quiz state and time
    let currentQuestionIndex = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let questions = [];
    let totalSeconds = 0;
    let timerInterval; // Timer interval reference to stop it later

    // Function to start the timer
    function startTimer() {
        timerInterval = setInterval(function () {
            totalSeconds++;

            // Calculate minutes and seconds
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;

            // Format minutes and seconds to always show two digits
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            // Update the timer display
            document.getElementById("timer").textContent = minutes + ":" + seconds;
        }, 1000); // 1000 milliseconds = 1 second
    }

    // Function to stop the timer
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Fetch questions from the JSON file
    fetch('questionsAddition.json')
        .then(response => response.json())
        .then(data => {
            questions = data; // Store all questions
            displayQuestion(); // Display the first question
            startTimer(); // Start the timer when quiz begins
        })
        .catch(error => {
            console.error('Error fetching the questions:', error);
        });

    // Function to display a question based on the currentQuestionIndex
    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const questionData = questions[currentQuestionIndex];

            // Display question in h1 tag
            document.querySelector('#question').textContent = "What will be ";
            document.getElementById('question').textContent += questionData.question;

            // Display options in divs
            document.getElementById('option-a').textContent = `a. ${questionData.options[0]}`;
            document.getElementById('option-b').textContent = `b. ${questionData.options[1]}`;
            document.getElementById('option-c').textContent = `c. ${questionData.options[2]}`;
            document.getElementById('option-d').textContent = `d. ${questionData.options[3]}`;

            // Clear previous input and focus the input field
            const userAnswerField = document.getElementById('user-answer');
            userAnswerField.value = '';
            userAnswerField.focus(); // Focus the input field for the next question
        } else {
            // All questions answered, display the result
            stopTimer(); // Stop the timer when quiz is finished
            displayResult();
        }
    }

    // Event listener for handling user input
    document.getElementById('submit-answer').addEventListener('click', function () {
        const userAnswer = document.getElementById('user-answer').value.toLowerCase();
        if (userAnswer === 'a' || userAnswer === 'b' || userAnswer === 'c' || userAnswer === 'd') {
            checkAnswer(userAnswer); // Check if the answer is correct
            currentQuestionIndex++; // Move to the next question
            displayQuestion(); // Display the next question
        } else {
            alert("Please enter a valid option (a, b, c, or d).");
        }
    });

    // Function to check the user's answer
    function checkAnswer(userAnswer) {
        const correctAnswerIndex = questions[currentQuestionIndex].options.indexOf(questions[currentQuestionIndex].answer);
        const correctOption = ['a', 'b', 'c', 'd'][correctAnswerIndex]; // Map index to a, b, c, d

        if (userAnswer === correctOption) {
            correctCount++; // Correct answer
        } else {
            wrongCount++; // Wrong answer
        }
    }

    // Function to display the quiz result
    function displayResult() {
        // Hide the question and input container
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('answer-input').style.display = 'none';

        // Calculate the total time taken by the user
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Show the result
        document.getElementById('quiz-result').style.display = 'block';
        document.getElementById('correct-count').textContent = `Correct Answers: ${correctCount}`;
        document.getElementById('wrong-count').textContent = `Wrong Answers: ${wrongCount}`;
        document.getElementById('time-taken').textContent = `Time Taken: ${minutes}:${seconds}`;
    }

    // Listen for "Enter" key press in the input field to trigger submit
    document.getElementById('user-answer').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            document.getElementById('submit-answer').click(); // Trigger submit button click
        }
    });



// // Global variables to keep track of quiz state
// let currentQuestionIndex = 0;
// let correctCount = 0;
// let wrongCount = 0;
// let questions = [];

// // Fetch questions from the JSON file
// fetch("questionsAddition.json")
//   .then((response) => response.json())
//   .then((data) => {
//     questions = data; // Store all questions
//     displayQuestion(); // Display the first question
//   })
//   .catch((error) => {
//     console.error("Error fetching the questions:", error);
//   });

// // Function to display a question based on the currentQuestionIndex
// function displayQuestion() {
//   if (currentQuestionIndex < questions.length) {
//     const questionData = questions[currentQuestionIndex];

//     // Display question in h1 tag
//     document.getElementById("question").textContent = questionData.question;

//     // Display options in divs
//     document.getElementById(
//       "option-a"
//     ).textContent = `a) ${questionData.options[0]}`;
//     document.getElementById(
//       "option-b"
//     ).textContent = `b) ${questionData.options[1]}`;
//     document.getElementById(
//       "option-c"
//     ).textContent = `c) ${questionData.options[2]}`;
//     document.getElementById(
//       "option-d"
//     ).textContent = `d) ${questionData.options[3]}`;

//     // Clear previous input and focus the input field
//     const userAnswerField = document.getElementById("user-answer");
//     userAnswerField.value = "";
//     userAnswerField.focus(); // Focus the input field for the next question
//   } else {
//     // All questions answered, display the result
//     displayResult();
//   }
// }

// // Event listener for handling user input
// document.getElementById("submit-answer").addEventListener("click", function () {
//   const userAnswer = document.getElementById("user-answer").value.toLowerCase();
//   if (
//     userAnswer === "a" ||
//     userAnswer === "b" ||
//     userAnswer === "c" ||
//     userAnswer === "d"
//   ) {
//     checkAnswer(userAnswer); // Check if the answer is correct
//     currentQuestionIndex++; // Move to the next question
//     displayQuestion(); // Display the next question
//   } else {
//     alert("Please enter a valid option (a, b, c, or d).");
//   }
// });

// // Function to check the user's answer
// function checkAnswer(userAnswer) {
//   const correctAnswerIndex = questions[currentQuestionIndex].options.indexOf(
//     questions[currentQuestionIndex].answer
//   );
//   const correctOption = ["a", "b", "c", "d"][correctAnswerIndex]; // Map index to a, b, c, d

//   if (userAnswer === correctOption) {
//     correctCount++; // Correct answer
//   } else {
//     wrongCount++; // Wrong answer
//   }
// }

// // Function to display the quiz result
// function displayResult() {
//   // Hide the question and input container
//   document.getElementById("question-container").style.display = "none";
//   document.getElementById("answer-input").style.display = "none";

//   // Show the result
//   document.getElementById("quiz-result").style.display = "block";
//   document.getElementById(
//     "correct-count"
//   ).textContent = `Correct Answers: ${correctCount}`;
//   document.getElementById(
//     "wrong-count"
//   ).textContent = `Wrong Answers: ${wrongCount}`;
// }

// // Listen for "Enter" key press in the input field to trigger submit
// document
//   .getElementById("user-answer")
//   .addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       document.getElementById("submit-answer").click(); // Trigger submit button click
//     }
//   });

// -----------------------------------------------------------------------------------
// // Global variables to keep track of quiz state
// let currentQuestionIndex = 0;
// let correctCount = 0;
// let wrongCount = 0;
// let questions = [];

// // Fetch questions from the JSON file
// fetch("questionsAddition.json")
//   .then((response) => response.json())
//   .then((data) => {
//     questions = data; // Store all questions
//     displayQuestion(); // Display the first question
//   })
//   .catch((error) => {
//     console.error("Error fetching the questions:", error);
//   });

// // Function to display a question based on the currentQuestionIndex
// function displayQuestion() {
//   if (currentQuestionIndex < questions.length) {
//     const questionData = questions[currentQuestionIndex];

//     // Display question in h1 tag
//     document.getElementById("question").textContent = questionData.question;

//     // Display options in divs
//     document.getElementById(
//       "option-a"
//     ).textContent = `a) ${questionData.options[0]}`;
//     document.getElementById(
//       "option-b"
//     ).textContent = `b) ${questionData.options[1]}`;
//     document.getElementById(
//       "option-c"
//     ).textContent = `c) ${questionData.options[2]}`;
//     document.getElementById(
//       "option-d"
//     ).textContent = `d) ${questionData.options[3]}`;

//     // Clear previous input
//     document.getElementById("user-answer").value = "";
//   } else {
//     // All questions answered, display the result
//     displayResult();
//   }
// }

// // Event listener for handling user input
// document.getElementById("submit-answer").addEventListener("click", function () {
//   const userAnswer = document.getElementById("user-answer").value.toLowerCase();
//   if (
//     userAnswer === "a" ||
//     userAnswer === "b" ||
//     userAnswer === "c" ||
//     userAnswer === "d"
//   ) {
//     checkAnswer(userAnswer); // Check if the answer is correct
//     currentQuestionIndex++; // Move to the next question
//     displayQuestion(); // Display the next question
//   } else {
//     alert("Please enter a valid option (a, b, c, or d).");
//   }
// });

// // Function to check the user's answer
// function checkAnswer(userAnswer) {
//   const correctAnswerIndex = questions[currentQuestionIndex].options.indexOf(
//     questions[currentQuestionIndex].answer
//   );
//   const correctOption = ["a", "b", "c", "d"][correctAnswerIndex]; // Map index to a, b, c, d

//   if (userAnswer === correctOption) {
//     correctCount++; // Correct answer
//   } else {
//     wrongCount++; // Wrong answer
//   }
// }

// // Function to display the quiz result
// function displayResult() {
//   // Hide the question and input container
//   document.getElementById("question-container").style.display = "none";
//   document.getElementById("answer-input").style.display = "none";

//   // Show the result
//   document.getElementById("quiz-result").style.display = "block";
//   document.getElementById(
//     "correct-count"
//   ).textContent = `Correct Answers: ${correctCount}`;
//   document.getElementById(
//     "wrong-count"
//   ).textContent = `Wrong Answers: ${wrongCount}`;
// }

// ---------------------------------------------------------------------------------------
// // Fetch a single question from the JSON file
// fetch("questionsAddition.json")
//   .then((response) => response.json())
//   .then((data) => {
//     // Get the first question (you can change index if needed)
//     const questionData = data[0];

//     // Display question in h1 tag
//     document.getElementById("question").textContent = questionData.question;

//     // Display options in divs
//     document.getElementById(
//       "option-a"
//     ).textContent = `a) ${questionData.options[0]}`;
//     document.getElementById(
//       "option-b"
//     ).textContent = `b) ${questionData.options[1]}`;
//     document.getElementById(
//       "option-c"
//     ).textContent = `c) ${questionData.options[2]}`;
//     document.getElementById(
//       "option-d"
//     ).textContent = `d) ${questionData.options[3]}`;
//   })
//   .catch((error) => {
//     console.error("Error fetching the questions:", error);
//   });

// // Event listener for handling user input
// document.getElementById("submit-answer").addEventListener("click", function () {
//   const userAnswer = document.getElementById("user-answer").value.toLowerCase();

//   // Empty event handler function where you can perform the task based on the selected option
//   // You can add your logic here based on the value of `userAnswer`
// });

// -----------------------------------------------------------------------------------------------
// // Fetch the questions from the JSON file
//         fetch('questionsAddition.json')
//             .then(response => response.json())
//             .then(data => {
//                 // Iterate over the questions
//                 data.forEach((item, index) => {
//                     // Get the question, options, and answer
//                     const questionText = `Question ${index + 1}: ${item.question}`;
//                     const optionsText = `Options: ${item.options.join(", ")}`;
//                     const answerText = `Answer: ${item.answer}`;

//                     // Create new h4 elements for each question
//                     const questionElement = document.createElement('h4');
//                     questionElement.textContent = questionText;

//                     const optionsElement = document.createElement('h4');
//                     optionsElement.textContent = optionsText;

//                     const answerElement = document.createElement('h4');
//                     answerElement.textContent = answerText;

//                     // Append the elements to the container
//                     document.getElementById('question-container').appendChild(questionElement);
//                     document.getElementById('question-container').appendChild(optionsElement);
//                     document.getElementById('question-container').appendChild(answerElement);
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching the questions:', error);
//             });
