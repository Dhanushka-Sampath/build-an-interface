import React, { useState, useEffect } from 'react';

const Counter = () => {
    //here count is the state variable
    const [count, setCount] = useState(0);

    useEffect(() => {
      if(count !== 0){
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
      }

    });

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    )
}

export default Counter