import React from 'react';
import quizQuestions from './components/quizQuestion';
import Quiz from './components/Quiz';
import Result from './components/Result'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: 0,
      correct: 0,
      yourAnswer: []
    }
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {

    const shuffledQuestion = this.shuffleQuizQuestions(quizQuestions);
    const shuffledAnswerOptions = shuffledQuestion.map(question => this.shuffleArray(question.answers));
    const counter = this.state.counter;


    this.setState({
      question: shuffledQuestion[counter].question,
      answerOptions: shuffledAnswerOptions[counter],
      log: shuffledQuestion
    });
    console.log(shuffledQuestion);
  }


  shuffleQuizQuestions(array) {
    for (let i = array.length - 1; 0 < i; i--) {
      var r = Math.floor(Math.random() * (i + 1));

      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    const counter = this.state.counter;
    this.setState({yourAnswer: answer});
    if (answer === quizQuestions[counter].correct.type) {
      this.setState((state) => ({
        correct: state.correct + 1
      }));
    }
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const correct = this.state.correct;
    return correct;
  }

  setResults(result) {
    this.setState({result: result});
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result counter={this.state.counter + 1} quizResult={this.state.result} handleSubmit={this.handleReset}/>
    );
  }

  handleReset() {
    const shuffledQuestion = this.shuffleQuizQuestions(quizQuestions);
    const shuffledAnswerOptions = shuffledQuestion.map(question => this.shuffleArray(question.answers));

    this.setState({
      counter: 0,
      questionId: 1,
      question: shuffledQuestion[0].question,
      answerOptions: shuffledAnswerOptions[0],
      answer: '',
      answersCount: {},
      result: 0,
      correct: 0
    });

    console.log(shuffledQuestion);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Pokemon Quiz</h2>
        </div>
        <div className="App-body">
          {this.state.result ? this.renderResult() : this.renderQuiz()}
        </div>
      </div>
    );
  }
}

export default App;
