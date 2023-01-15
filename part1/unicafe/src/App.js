import { useEffect, useState } from 'react';

const CustomButton = ({ text, onClickHandler }) => (
  <button onClick={onClickHandler}>{text}</button>
);

const Heading = ({ text }) => <h2>{text}</h2>;

const Result = ({ text, value }) => (
  <p>
    {text} &nbsp; {value}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  useEffect(() => {
    if (good > 0 || neutral > 0 || bad > 0) {
      const total = good + neutral + bad;
      setAverage(total / 3);
      setPositive((good * 100) / total); // 80% * 40 = 32
    }
  }, [good, neutral, bad]);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Heading text='Give Feedback' />
      <CustomButton text='good' onClickHandler={handleGoodClick} />
      <CustomButton text='neutral' onClickHandler={handleNeutralClick} />
      <CustomButton text='bad' onClickHandler={handleBadClick} />
      <Heading text='Statistics' />
      <Result text='good' value={good} />
      <Result text='neutral' value={neutral} />
      <Result text='bad' value={bad} />
      <Result text='all' value={good + bad + neutral} />
      <Result text='average' value={average} />
      <Result text='positive' value={positive} />
    </div>
  );
};

export default App;
