import { useState } from 'react';

const Button = ({ text, onClickHandler }) => (
  <button onClick={onClickHandler}>{text}</button>
);

const Heading = ({ text }) => <h2>{text}</h2>;

const StatisticLine = ({ text, value }) => (
  <table>
    <tbody>
      <tr>
        <td>{text} &nbsp;</td>
        <td>&nbsp;{value}</td>
      </tr>
    </tbody>
  </table>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good > 0 || neutral > 0 || bad > 0) {
    const total = good + bad + neutral;
    return (
      <div>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={(total / 3).toFixed(2)} />
        <StatisticLine
          text='positive'
          value={((good * 100) / total).toFixed(2) + '%'}
        />
      </div>
    );
  }
  return <h4>No feedback given!</h4>;
};

const App = () => {
  // save clicks of each button to its own state

  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodClick = () => {
    const updatedFeedback = {
      ...feedback,
      good: feedback.good + 1,
    };
    setFeedback(updatedFeedback);
  };

  const handleNeutralClick = () => {
    const updatedFeedback = {
      ...feedback,
      neutral: feedback.neutral + 1,
    };
    setFeedback(updatedFeedback);
  };

  const handleBadClick = () => {
    const updatedFeedback = {
      ...feedback,
      bad: feedback.bad + 1,
    };
    setFeedback(updatedFeedback);
  };

  return (
    <div>
      <Heading text='Give Feedback' />
      <Button text='good' onClickHandler={handleGoodClick} />
      <Button text='neutral' onClickHandler={handleNeutralClick} />
      <Button text='bad' onClickHandler={handleBadClick} />
      <Heading text='Statistics' />
      <Statistics
        good={feedback.good}
        neutral={feedback.neutral}
        bad={feedback.bad}
      />
    </div>
  );
};

export default App;
