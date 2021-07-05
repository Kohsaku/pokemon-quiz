import React from 'react';
import ResultTableRow from './ResultTableRow';

const ResultTable = props => (
  <table className="resultTable">
    <thead>
      <th>問題</th>
      <th>あなたの回答</th>
      <th>正解</th>
    </thead>
    <tbody>
      {props.log.map(log => <ResultTableRow log={log} />)}
    </tbody>
  </table>
);

export default ResultTable;