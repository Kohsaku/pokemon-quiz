import React from 'react';

const TopPage = props => {
  return (
    <div className="topPage">
      <h1>Pokemon Quiz</h1>
      <form>
        <label>
            <select>
                {props.numbers.map(number => (
                    <option>{number}</option>
                ))}
            </select>
        </label>
      </form>
    </div>
  )
}

export default TopPage;