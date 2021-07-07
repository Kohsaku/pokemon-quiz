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
      {props.log.slice(0, props.counter).map(slicedLog => <ResultTableRow log={slicedLog} />)}
    </tbody>
  </table>
);

export default ResultTable;