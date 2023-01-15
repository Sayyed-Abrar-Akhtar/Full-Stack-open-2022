import { useState } from 'react';

const Vote = ({ voteCount }) => {
  if (voteCount > 0) {
    return (
      <h4>
        has {voteCount} {voteCount > 1 ? 'votes' : 'vote'}
      </h4>
    );
  }
  return <h4>has no vote!</h4>;
};

const LargestVote = ({ hasVotes, anecdotes }) => {
  if (hasVotes > -1) {
    return (
      <div>
        <h2>{anecdotes}</h2>
      </div>
    );
  }
  return null;
};

const Button = ({ text, onClickHandler }) => (
  <button onClick={onClickHandler}>{text}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];
  const points = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(points);
  const [largest, setLargest] = useState(-1);

  const handleAnecdotes = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVote = () => {
    let largestVote = 1;

    vote[selected] += 1;

    vote.forEach((vote) => {
      if (vote > largestVote) {
        largestVote = vote;
      }
    });

    setLargest(vote.indexOf(largestVote));

    setVote([...vote]);
  };

  return (
    <div>
      <h2>{anecdotes[selected]}</h2>
      <Vote voteCount={vote[selected]} />
      <Button text='vote' onClickHandler={handleVote} />
      <Button text='next anecdotes' onClickHandler={handleAnecdotes} />
      <LargestVote hasVotes={largest} anecdotes={anecdotes[largest]} />
    </div>
  );
};

export default App;
