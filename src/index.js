import {createStore} from "redux";

const form = document.querySelector("form");
const input = form.querySelector("input");
const ul = document.querySelector("ul");

const ADD = "ADD";
const DELETE = "DELETE";


const updateData = (state=[], action) => {
  switch (action.type) {
    case ADD:
      const addedToDo = [...state, {text: action.text, id: Date.now()}];
      return addedToDo;
    case DELETE:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(updateData);

const dispatchDelete = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch({type: DELETE, id});
}

const paintToDo = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    li.id = toDo.id;
    const btn = document.createElement("button");
    li.innerText = toDo.text;
    btn.innerText = "Done";
    ul.appendChild(li);
    li.appendChild(btn);
    btn.addEventListener("click", dispatchDelete);
  });
}

store.subscribe(paintToDo);

const getValue = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value= "";
  store.dispatch({type: ADD, text: toDo});
}

form.addEventListener("submit", getValue);


