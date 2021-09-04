import React from 'react';
import quizQuestions from './components/quizQuestion';
import Quiz from './components/Quiz';
import Result from './components/Result';
import TopPage from './components/TopPage';

import Header from './components/Header';
import LoginPage from './components/LoginPage';
import HistoryPage from './components/HistoryPage';
import SignupPage from './components/SignupPage';
import MenuSidebar from './components/MenuSidebar';

import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import { auth } from './api/firebase';

import { createResultSubCollection } from './api/firebase';

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
      yourAnswer: [],
      log:[],
      numberOfQuestion: 3,
      sidebar: false
    };
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSidebar = this.handleSidebar.bind(this);
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

  handleNumberChange(event) {
    this.setState({numberOfQuestion: event.target.value});
    console.log(event.target.value);
  }

  handleAnswerSelected(event) {
    const numberOfQuestion = this.state.numberOfQuestion;
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < numberOfQuestion) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults(), this.getLog()), 300);
    }
  }

  setUserAnswer(answer) {
    const counter = this.state.counter;
    const answerOptions = this.state.answerOptions;
    const yourAnswer = this.state.yourAnswer;

    if (answer === quizQuestions[counter].correct[0]) {
      this.setState((state) => ({
        correct: state.correct + 1
      }));
    }

    console.log(answer);
    for (let i = 0; i < answerOptions.length; i++) {
      if (answer === answerOptions[i].type) {
        let selectedAnswer = answerOptions[i].content;
        yourAnswer.push(selectedAnswer);
      } else {
        continue;
      }
    }
    this.setState({yourAnswer: yourAnswer});
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

  getLog() {
    const log = this.state.log;
    const yourAnswer = this.state.yourAnswer;

    for (let i = 0; i < yourAnswer.length; i++) {
      log[i].yourAnswer = yourAnswer[i];
    }
    return log;
  }

  setResults(result, log) {
    console.log(log);
    this.setState({result: result});
    this.setState({log: log});
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.numberOfQuestion}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result 
        counter={this.state.counter + 1} 
        quizResult={this.state.result}
        log={this.state.log}
        handleSubmit={this.handleReset}/>
    );
  }

  handleReset(event) {
    const currentUser = auth.currentUser;
    const shuffledQuestion = this.shuffleQuizQuestions(quizQuestions);
    const shuffledAnswerOptions = shuffledQuestion.map(question => this.shuffleArray(question.answers));
    const { log, counter } = this.state;
    const yourResult = log.slice(0, counter+1);

    if (!currentUser) {
      this.setState({
        counter: 0,
        questionId: 1,
        question: shuffledQuestion[0].question,
        answerOptions: shuffledAnswerOptions[0],
        answer: '',
        answersCount: {},
        result: 0,
        correct: 0,
        yourAnswer: [],
        log: shuffledQuestion
      });
      this.props.history.push('/');

      console.log(shuffledQuestion);

    } else {
      createResultSubCollection(currentUser, yourResult);

      this.setState({
        counter: 0,
        questionId: 1,
        question: shuffledQuestion[0].question,
        answerOptions: shuffledAnswerOptions[0],
        answer: '',
        answersCount: {},
        result: 0,
        correct: 0,
        yourAnswer: [],
        log: shuffledQuestion
      });
      this.props.history.push('/');

      console.log(shuffledQuestion);
    }

    event.preventDefault();
  }

  handleSignOut() {
    auth.signOut().then(() => {
      console.log('sign out successfuly');
    })
  }

  handleSidebar() {
    const sidebar = this.state.sidebar;
    this.setState({ sidebar: !sidebar});
  }

  render() {
    const sidebar = this.state.sidebar;
    return (
        <div className="App">
          <Header handleSignOut={this.handleSignOut} handleSidebar={this.handleSidebar} />
          {sidebar ? 
            <MenuSidebar 
              sidebar={sidebar} 
              handleSidebar={this.handleSidebar}
            /> : null
          }
          <Switch>
            <Route exact path="/">
              <TopPage numbers={[3, 5, 6]} onChange={this.handleNumberChange} />
            </Route>
            <Route path="/quiz">
              <div className="App-body">
                {this.state.result ? this.renderResult() : this.renderQuiz()}
              </div>
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/history">
              <HistoryPage />
            </Route>
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);
