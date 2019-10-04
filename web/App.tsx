import * as React from 'react';

function App() {
  const [ count, setCount ] = React.useState(0)

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <>
      <p>222 : { count }</p>
      <button onClick={ increment }>Increment</button>
      <button onClick={ decrement }>Decrement</button>
    </>
  );
}

export default App;
