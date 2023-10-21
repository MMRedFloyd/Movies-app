import { createStore, combineReducers } from "redux";

const initialStateAuth = {
  isLoggedIn: false,
  laoding: true,
  currentAcc: "",
  userUid: "",
  error: null,
};

const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        laoding: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        laoding: false,
        error: null,
      };

    case "FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        laoding: false,
        error: action.payload,
      };

    case "END":
      return {
        ...state,
        laoding: false,
      };

    default:
      return state;
  }
};

///////////////////////////////////////////////

const initialStateForm = {
  isVisible: false,
};

const formReducer = (state = initialStateForm, action) => {
  switch (action.type) {
    case "show":
      return {
        ...state,
        isVisible: true,
      };

    case "hide":
      return {
        ...state,
        isVisible: false,
      };

    default:
      return state;
  }
};

///////////////////////////////////////////////

const initialStateSearch = {
  searchTitle: "",
  searchRef: null,
};

const searchReducer = (state = initialStateSearch, action) => {
  switch (action.type) {
    case "SET_SEARCH_TITLE":
      return {
        ...state,
        searchTitle: action.payload,
      };

    case "SET_SEARCH_REF":
      return {
        ...state,
        searchRef: action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  form: formReducer,
  search: searchReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
