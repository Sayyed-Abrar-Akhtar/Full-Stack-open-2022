import { useState } from 'react';

const CustomButton = ({ text, onClickHandler }) => (
  <button onClick={onClickHandler}>{text}</button>
);

const Heading = ({ text }) => <h2>{text}</h2>;

const Result = ({ text, value }) => (
  <p>
    {text} &nbsp; {value}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good > 0 || neutral > 0 || bad > 0) {
    const total = good + bad + neutral;
    return (
      <div>
        <Result text='good' value={good} />
        <Result text='neutral' value={neutral} />
        <Result text='bad' value={bad} />
        <Result text='all' value={total} />
        <Result text='average' value={total / 3} />
        <Result text='positive' value={(good * 100) / total} />
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
      <CustomButton text='good' onClickHandler={handleGoodClick} />
      <CustomButton text='neutral' onClickHandler={handleNeutralClick} />
      <CustomButton text='bad' onClickHandler={handleBadClick} />
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
