import React from 'react';

const ResultTableRow = (props, Answer) => (
    <tr>
      <td>{props.quizQuestion.question}</td>
      <td>{Answer[props.quizQuestion.length - 1]}</td>
      <td>{props.quizQuestion.correct.content}</td>
    </tr>
);