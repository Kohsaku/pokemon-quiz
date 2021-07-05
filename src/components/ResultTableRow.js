import React from 'react';

const ResultTableRow = props => (
    <tr　key={props.key}>
      <td>{props.log.question}</td>
      <td>{props.log.yourAnswer}</td>
      <td>{props.log.correct[1]}</td>
    </tr>
);

export default ResultTableRow;