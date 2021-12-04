import React from "react";
import quizQuestions from "./components/quizQuestion";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import TopPage from "./components/TopPage";

import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import HistoryPage from "./components/HistoryPage";
import SignupPage from "./components/SignupPage";
import MenuSidebar from "./components/MenuSidebar";

import { Switch, Route, withRouter } from "react-router-dom";

import {
  auth,
  createResultSubCollection,
  signInWithGoogle,
} from "./api/firebase";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      questionId: 1,
      question: "",
      answerOptions: [],
      answer: "",
      answersCount: {},
      result: 0,
      correct: 0,
      yourAnswer: [],
      log: [],
      numberOfQuestion: 5,
      sidebar: false,
      showResult: false,
      isLogin: false,
    };
    this.handleQuizClick = this.handleQuizClick.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSidebar = this.handleSidebar.bind(this);
    this.handleIsLogin = this.handleIsLogin.bind(this);
    this.handleGoogleSignin = this.handleGoogleSignin.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      this.setState({ isLogin: false });
    } else {
      this.setState({ isLogin: true });
    }
    console.log(currentUser);
  }

  // 問題をシャッフルする
  shuffleQuizQuestions(array) {
    for (let i = array.length - 1; 0 < i; i--) {
      var r = Math.floor(Math.random() * (i + 1));

      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
  }

  // 選択肢をシャッフルする
  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  handleQuizClick(event) {
    const shuffledQuestion = this.shuffleQuizQuestions(quizQuestions);
    const shuffledAnswerOptions = shuffledQuestion.map((question) =>
      this.shuffleArray(question.answers)
    );
    const counter = this.state.counter;

    this.setState({
      question: shuffledQuestion[counter].question,
      answerOptions: shuffledAnswerOptions[counter],
      log: shuffledQuestion,
    });

    this.props.history.push("/quiz");

    event.preventDefault();
  }

  // 問題数をstateにセットする
  handleNumberChange(event) {
    this.setState({ numberOfQuestion: event.target.value });
    console.log(this.state.numberOfQuestion);
  }

  // 選択された回答をsetUserAnswerにセットし、指定の問題数まで満たなければ次のquestionへ、満たされればsetResultへ
  handleAnswerSelected(event) {
    const numberOfQuestion = this.state.numberOfQuestion;
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < numberOfQuestion) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults(), this.getLog()), 300);
    }
  }

  // 正解を判定し、正解の数のstateを更新する。そしてあなたの回答をstate(配列)にセットする。
  setUserAnswer(answer) {
    const { counter } = this.state;

    this.setState((state) => ({
      yourAnswer: this.state.yourAnswer.concat(answer),
    }));

    answer === quizQuestions[counter].correct &&
      this.setState((state) => ({
        correct: state.correct + 1,
      }));
  }

  // 次の問題に移る
  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: "",
    });
  }

  getResults() {
    const correct = this.state.correct;
    return correct;
  }

  // yourAnswerをlog内に組み込み、yourAnswerの存在するオブジェクトから並ぶよう並び替える
  getLog() {
    const { log, yourAnswer } = this.state;

    for (let i = 0; i < yourAnswer.length; i++) {
      log[i].yourAnswer = yourAnswer[i];
    }
    log.sort((a, b) => a.yourAnswer - b.yourAnswer);
    return log;
  }

  // result, logの最終stateをセットし、resultコンポーネントを表示するためshowResultをtrueに変換。
  setResults(result, log) {
    this.setState({ result: result });
    this.setState({ log: log });
    this.setState({ showResult: true });
  }

  // Quiz componentをレンダーする
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
  // Result componentをレンダーする
  renderResult() {
    return (
      <Result
        counter={this.state.counter + 1}
        quizResult={this.state.result}
        log={this.state.log}
        handleSubmit={this.handleReset}
      />
    );
  }

  // もしログインしていない場合はステートを初期化して戻す。ログインしているならfirebaseに結果を作成して初期化して戻す
  handleReset(event) {
    const currentUser = auth.currentUser;
    const { log, counter } = this.state;
    const yourResult = log.slice(0, counter + 1);

    if (!currentUser) {
      this.setState({
        counter: 0,
        questionId: 1,
        answer: "",
        answersCount: {},
        result: 0,
        correct: 0,
        yourAnswer: [],
        showResult: false,
      });
      this.props.history.push("/");
    } else {
      createResultSubCollection(currentUser, yourResult);

      this.props.history.push("/");
      this.setState({
        counter: 0,
        questionId: 1,
        answer: "",
        answersCount: {},
        result: 0,
        correct: 0,
        yourAnswer: [],
        showResult: false,
      });
    }

    event.preventDefault();
  }

  handleIsLogin() {
    this.setState({ isLogin: true });
  }

  async handleGoogleSignin() {
    await signInWithGoogle()
      .then(this.setState({ isLogin: true }))
      .then(this.props.history.push("/"));
  }

  handleSignOut() {
    auth.signOut().then(() => {
      this.setState({ isLogin: false });
    });
  }

  handleSidebar() {
    const sidebar = this.state.sidebar;
    this.setState({ sidebar: !sidebar });
  }

  render() {
    const { sidebar, isLogin, numberOfQuestion } = this.state;
    return (
      <div className="App">
        <Header
          isLogin={isLogin}
          handleSignOut={this.handleSignOut}
          handleSidebar={this.handleSidebar}
        />
        {sidebar ? (
          <MenuSidebar sidebar={sidebar} handleSidebar={this.handleSidebar} />
        ) : null}
        <Switch>
          <Route exact path="/">
            <TopPage
              numbers={[5, 10, 15]}
              onChange={this.handleNumberChange}
              onClick={this.handleQuizClick}
              numberOfQuestion={numberOfQuestion}
            />
          </Route>
          <Route path="/quiz">
            <div className="App-body">
              {this.state.showResult ? this.renderResult() : this.renderQuiz()}
            </div>
          </Route>
          <Route path="/login">
            <LoginPage
              emailLogin={this.handleIsLogin}
              googleSignin={this.handleGoogleSignin}
            />
          </Route>
          <Route path="/signup">
            <SignupPage onClick={this.handleIsLogin} />
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
