// This function stores our state.

export const storeState = () => {   //store the currentState of an object
  let currentState = {};
  return (stateChangeFunction = state => state) => {   //The function that we pass in will specify the exact change that should be made to currentState
    const newState = stateChangeFunction(currentState);  //Instead of mutating currentState, we will save the new state in a constant called newState
    currentState = {...newState};  //We will make a copy of newState and assign it to currentState
    return newState;                  //because it takes time to update and return currentState (an async operation), we can provide a quick snapshot of state to users by just returning the equivalent of newState.
  };
};

export const stateControl = storeState();   //we are actually invoking the storeState() function and creating a closure over the currentState variable in the outer function.

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};

// We create four functions using our function factory. We could easily create many more.

export const feed = changeState("soil")(1);
export const blueFood = changeState("soil")(5);

export const hydrate = changeState("water")(1);
export const superWater = changeState("water")(5);

