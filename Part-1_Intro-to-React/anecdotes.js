import React, { Fragment, useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0]);

  const mostVoted = () => {
    let min_num = 0;
    let most_voted = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (vote[i] > min_num) {
        most_voted = i;
        min_num = vote[i];
      }
    }
    return most_voted;
  };
  let most_voted = mostVoted();
  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const voted = () => {
    const vote_now = [...vote];
    vote_now[selected] += 1;
    setVote(vote_now);
  };
  return (
    <Fragment>
      <h1>Anecdotes of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {vote[selected]} votes</div>
      <button onClick={voted}>Vote</button>
      <button onClick={nextAnecdote}>next anecdotes</button>
      <br />
      <h1>Anecdotes with most Vote</h1>
      <div>{anecdotes[most_voted]}</div>
      <div>has {vote[most_voted]} votes</div>
    </Fragment>
  );
};

export default App;
