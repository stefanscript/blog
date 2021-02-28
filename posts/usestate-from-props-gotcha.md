---
title: useState from props gotcha
date: "2021-02-21"
author: stefan
---

I was recently working on a React Countdown component.

![Countdown](/images/countdown1.png)

Below, I show a naive example of that component.  
_Note: You will see code that might not be production ready._

    //Countdown.js
    export default function Countdown({ countdownMs }) {
      const [timeLeft, setTimeLeft] = useState(countdownMs);

      useEffect(() => {
        const intervalId = setInterval(() => {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - ONE_SECOND);
        }, ONE_SECOND);
        return () => {
          clearInterval(intervalId);
        };
      }, []);

      return (
        <ul className={"countdown"}>
          ...
        </ul>
      );
    }
    ...

### The problem
As you can see I was using `countdownMs` as the param for useState. Because it had to wait for the api response to
resolve, the first time the value of the prop was `undefined`.  
Few moments later the "real value" was received, lets say 60000ms (1 minute).  
At this moment I expected the countdown to show the update value, but this didn't happen.
See if you spot why.  
.  
.  
.  
.  
.  
.    
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
After a few moments I realised my mistake: I overlooked how useState really works.   
useState brings state variables to functional components. You initialise a variable (e.g. `timeLeft`) with a value and 
React "remembers" this value between re-renders.   
Once initialised you can update the variable with the provided "setState" function (`setTimeLeft`).   
In this case, a new prop for `countdownMs` will not reinitialise `timeLeft`.   

One way to fix this is to use another useEffect: 

    //Countdown.js
    export default function Countdown({ countdownMs }) {
      const [timeLeft, setTimeLeft] = useState(countdownMs);
      
      useEffect(() => {
        const intervalId = setInterval(() => {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - ONE_SECOND);
        }, ONE_SECOND);
        return () => {
          clearInterval(intervalId);
        };
      }, []);
      
      useEffect(() => {
        setTimeLeft(countdownMs);
      }, [countdownMs]);
      
      return (
        <ul className={"countdown"}>
          ...
        </ul>
      );
    }
    ...

[Further reading - https://reactjs.org/docs/hooks-state.html](https://reactjs.org/docs/hooks-state.html)
