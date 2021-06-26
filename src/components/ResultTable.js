import React from 'react';

const ResultTable = props => (
  <table>
    <thead>
      <th>問題</th>
      <th>あなたの回答</th>
      <th>正解</th>
    </thead>
    <tbody>
      <ResutTableRow quizQuestions={props.quizQuestions} yourAnswer={props.yourAnswer} />
    </tbody>
  </table>
);