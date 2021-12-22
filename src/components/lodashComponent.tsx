import React, {useState} from 'react'

var _ = require('lodash');

interface LodashComponentProps {
    lodashStuff: string;
}

const LodashComponent = (lodashComponentProps: LodashComponentProps) => {

    //Can just do {lodashStuff} : LodashComponentProps to "deconstruct" from our param above.
    const myList = [
        "Water",
        "Water",
        "Chicken",
        "Banannas",
        "Banannas",
        "Cake",
        "Water"
    ];
    
    const myList2 = [
        "Water",
        "Banannas"
    ];
    
    //"chunk" will split the array into "chunks of 3" below.
    //const myNewArray = _.chunk(myList,3);
    
    //"difference" will compare two arrays and make a new one out of what is not in both.
    //const myNewArray = _.difference(myList, myList2);
    
    //"intersection" will compare two arrays and return the same.
    //const myNewArray = _.intersection(myList, myList2);
    
    //"join" will take two arrays and join them.
    //const myNewArray = _.join(myList, '|');
    
    //"without" will return an array without the designated.
    //const myNewArray = _.without(myList, "Water", "Banannas");
    
    //"unique" will remove duplicates.
    const myNewArray = _.uniq(myList);
    
    //console.log(myNewArray);     

    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(count + 1);
    }
    return (
        <div>
        <p>{lodashComponentProps.lodashStuff} Here's your number too: {count}</p>
        <button onClick={increment}>ButtonText</button>
        <h1>Here's the LodashComponent stuff: {JSON.stringify(myNewArray)}</h1>
        </div>
    )
}
export default LodashComponent;