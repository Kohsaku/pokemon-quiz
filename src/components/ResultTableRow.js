import React from 'react';

const ResultTableRow = (props, Answer) => (
  <span>
    <tr>{props.quizQuestion.question}</tr>
    <tr>{Answer[props.quizQuestion.length - 1]}</tr>
    <tr>{props.quizQuestion.correct.content}</tr>
  </span>
);