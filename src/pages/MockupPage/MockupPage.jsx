import { useReducer } from "react";
import "./MockupPage.css";

const INCREMENT_COUNT = "incrementCount";
const DECREMENT_COUNT = "decrementCount";
const ADD_TO_COUNT = "addToCount";
const SET_NUMBER_TO_ADD = "setNumberToAdd";

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + action.payload,
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - action.payload,
      };
    case ADD_TO_COUNT:
      return {
        ...state,
        count: state.count + state.numberToAdd,
        numberToAdd: 0,
      };
    case SET_NUMBER_TO_ADD:
      return {
        ...state,
        numberToAdd: action.payload,
      };
    default:
      throw new Error(`Unexpected Action Type Received : ${action.type}`);
  }
};

export default function MockupPage() {
  const [state, dispatch] = useReducer(reducer, { count: 0, numberToAdd: 0 });
  const increment = () => {
    dispatch({
      type: INCREMENT_COUNT,
      payload: 1,
    });
  };

  const decrement = () => {
    if (state.count - 1 < 0) return;
    dispatch({
      type: DECREMENT_COUNT,
      payload: 1,
    });
  };

  const numberToAddChangeHandler = (event) => {
    if (!event.target.value) {
      dispatch({
        type: SET_NUMBER_TO_ADD,
        payload: 0,
      });
      return;
    }
    dispatch({
      type: SET_NUMBER_TO_ADD,
      payload: parseInt(event.target.value),
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: ADD_TO_COUNT,
    });
  };
  return (
    <>
      <header>
        <h1>Mockup Page</h1>
      </header>
      <main>
        <section id="counter-section">
          <p>Current Count : {state.count}</p>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <form onSubmit={submitHandler}>
            <label htmlFor="number-to-add">Add a lot!</label>
            <input
              type="number"
              min={0}
              value={state.numberToAdd}
              onChange={numberToAddChangeHandler}
            />
            <button type="submit">Add it!</button>
          </form>
        </section>
      </main>
    </>
  );
}
