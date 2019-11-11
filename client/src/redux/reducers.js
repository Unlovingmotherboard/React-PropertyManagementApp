import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

const loggedReducer = function(state = false, action) {
  switch (action) {
    case "CLEAR_ADD_FORM":
      
      return {
        ...state,
        currentItem: {
          text: "",
          key: ""
        }
      };
    default:
      return state;
  }
};

const managerORtenantReducer = function(state = true, action) {
  switch (action) {
    case "CLEAR_ADD_FORM":
      
      return {
        ...state,
        currentItem: {
          text: "",
          key: ""
        }
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  loggedReducer,
  managerORtenantReducer,
  form: formReducer
});

export default rootReducer;
