import { createStore } from "https://cdn.skypack.dev/redux";
import profileReducer from "./profileReducer.js";
import {
  ADD_PROFILE,
  REMOVE_PROFILE,
  CALCULATE_AVERAGE_AGE,
} from "./actions.js";

const store = createStore(
  profileReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const profilesList = document.querySelector("#profilesList");
const averageAgeDisplay = document.querySelector("#averageAge");
const addProfileBtn = document.querySelector("#addProfileBtn");
const removeProfileBtn = document.querySelector("#removeProfileBtn");
const idField = document.querySelector("#idField");
const nameField = document.querySelector("#nameField");
const ageField = document.querySelector("#ageField");
const inputIdField = document.querySelector("#inputIdField");

const profiles = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

function renderProfiles() {
  const state = store.getState();
  profilesList.innerHTML = "";

  state.profiles.forEach((profile) => {
    const li = document.createElement("li");
    li.textContent = `${profile.id}. ${profile.name} - Age: ${profile.age}`;
    profilesList.appendChild(li);
  });
}

function updateAverageAge() {
  const state = store.getState();
  averageAgeDisplay.textContent = `Average Age: ${state.averageAge.toFixed(2)}`;
}

addProfileBtn.addEventListener("click", () => {
  const profile = {
    id: Number(idField.value),
    name: nameField.value,
    age: Number(ageField.value),
  };

  store.dispatch({ type: ADD_PROFILE, payload: profile });
  store.dispatch({ type: CALCULATE_AVERAGE_AGE });

  idField.value = "";
  nameField.value = "";
  ageField.value = "";
});

removeProfileBtn.addEventListener("click", () => {
  const idToRemove = Number(inputIdField.value);
  store.dispatch({ type: REMOVE_PROFILE, payload: { id: idToRemove } });
  store.dispatch({ type: CALCULATE_AVERAGE_AGE });

  inputIdField.value = "";
});

store.subscribe(() => {
  console.log("Store updated: ", store.getState());
  renderProfiles();
  updateAverageAge();
});

profiles.forEach((profile) => {
  store.dispatch({ type: ADD_PROFILE, payload: profile });
});
store.dispatch({ type: CALCULATE_AVERAGE_AGE });
