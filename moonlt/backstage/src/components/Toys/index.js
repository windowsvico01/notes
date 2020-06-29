import React, { useState, useEffect } from 'react';

export default (props) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
       document.title = `你爹爹点击了${count}下`;
       return () => {
           // alert(2222);
       }
    }, [count]);
    return (
        <span>
          {count}
          <a onClick={() => setCount(count + 1)}>+++++++</a>
          <a onClick={() => setCount(count)}>----++</a>
        </span>
    );
}