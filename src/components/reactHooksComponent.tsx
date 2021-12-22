import React, { useState, useEffect, useRef, useMemo, useReducer, createContext, useContext} from 'react'
var _ = require('lodash');

const ReactHooksComponent = () => {

    //Because there are things you can't use "useState" for because it's 
    //constantly being reinitialized on every rerender, we need to use "useRef".
    //A "ref" is similar to "state" in which it persists between rerenders of your component,
    //but DOES NOT CAUSE your component to rerender when it changes (and can keep you out of infinite loops).

    //Biggest use for it is to "reference" elements inside your HTML.
    //Each element inside your HTML has its own "ref" value.
    //It works the same as using Document.querySelector() in JavaScript.
    
    //But, need to be careful and not overuse...because React should be the 
    //one handling the "state" and "useRef" is away to get around that by setting values yourself.

    //Another way of using is to store the previous value of your state.

    const [name, setName] = useState( () => {return ''});
    const renderCount = useRef(0); //A reference is simply an object with a "current" property.
    const inputRef = useRef<HTMLInputElement>();
    const prevName = useRef<string>('');

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    }, [renderCount])

    useEffect(() => {
        prevName.current = name;
    }, [name])

    const focus = () => {
        inputRef.current.focus();
    }
    
    return (
        <>
          <input ref={inputRef} value={name} onChange={ (e) => setName(e.target.value)}/>
          <div>My name is {name} and it used to be {prevName.current}</div>
          <div>I rendered {renderCount.current} times</div>
          <button onClick={focus}>Focus</button>
        </>
    )
}

export default ReactHooksComponent;