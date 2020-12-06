import {createStore} from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const text = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

text.innerText = 0;

const countModifier = (state = 0, action) => {
  switch (action.type) {
    case ADD:
      return state + 1;
    case MINUS:
      return state - 1;
    default:
      return state;
  }
};

const countStore = createStore(countModifier);

const handleAdd = () => {
  countStore.dispatch({ type : ADD });
}

const handleMinus = () => {
  countStore.dispatch({ type : MINUS });
}

const onChange = () => {
  text.innerText = countStore.getState();
}

countStore.subscribe(onChange);


add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);



