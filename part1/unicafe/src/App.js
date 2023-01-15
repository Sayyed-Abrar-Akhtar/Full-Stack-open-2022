import { useState } from 'react';

const CustomButton = ({ text, value, setValue }) => (
  <button onClick={() => setValue(value + 1)}>{text}</button>
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

  return (
    <div>
      <Heading text='Give Feedback' />
      <CustomButton text='good' value={good} setValue={setGood} />
      <CustomButton text='neutral' value={neutral} setValue={setNeutral} />
      <CustomButton text='bad' value={bad} setValue={setBad} />
      <Heading text='Statistics' />
      <Result text='good' value={good} />
      <Result text='neutral' value={neutral} />
      <Result text='bad' value={bad} />
    </div>
  );
};

export default App;
