import React from 'react';
import ResultTable from './ResultTable';
import CustomButton from './customButton';

import { withRouter } from 'react-router-dom';

const Result = props => {
  return (
      <div className='result'>
        {props.counter} 問中 {props.quizResult} 問 正解!!
        <ResultTable log={props.log} counter={props.counter} />
        <CustomButton handleSubmit={props.handleSubmit} label='TOP'/>
      </div>
  )
}

export default withRouter(Result);