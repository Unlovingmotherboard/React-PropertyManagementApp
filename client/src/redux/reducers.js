import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import { FROM_ACTION_LOGIN, FROM_NAVBAR_LOGOUT, IMPORT_PROPERTIES, SET_APPLICATIONS_FROM_DB, SET_UPDATES_FROM_DB, GET_UPDATES_FROM_DB, CONNECTING_TO_HERPESTIDAE, CONFIRMATION_MODAL_DISPLAY} from './actions';

const initialState = {
    token: null,
    managerORtenant: null,
    properties: [],
    applications: [],
    updates: [],
    tenantUpdates: [],
    renting: null,
    connectingToHerpestidae: false,
    displayConfirmModal: false
};



const loggedReducer = function(state = initialState, action) {
  switch (action.type) {
    case FROM_ACTION_LOGIN:
      
      return {
        ...state,
          token: action.fromLStoken,
          managerORtenant: action.fromLStype,
          username: action.fromLSusername,
          renting: action.isUserRenting
      }

      case FROM_NAVBAR_LOGOUT:
        return {
          ...state,
          token: "",
          managerORtenant: "",
          properties: [],
          applications: [],
          updates: [],
          tenantUpdates: [],
          renting: null
        }

        case CONFIRMATION_MODAL_DISPLAY:
        return {
          ...state,
          displayConfirmModal: action.showOrNah
        }

        case CONNECTING_TO_HERPESTIDAE:
        return {
          ...state,
          connectingToHerpestidae: action.yuhOrNah
        }

        case GET_UPDATES_FROM_DB:
        return {
          ...state,
          tenantUpdates: action.tenantUpdates
        }

        case SET_UPDATES_FROM_DB:
        return {
          ...state,
          updates: action.managerUpdates
        }

      case SET_APPLICATIONS_FROM_DB:
        return {
          ...state,
          applications: action.applications,
        }

        case IMPORT_PROPERTIES:
          return {
            ...state,
            properties: action.properties,
          }
    default:
      return state;
  }
};




// const managerORtenantReducer = function(state = initialState.loggedIn.managerORtenant, action) {
//   switch (action) {
//     case "CLEAR_ADD_FORM":
      
//       return {
//         ...state,
//         currentItem: {
//           text: "",
//           key: ""
//         }
//       };
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  loggedReducer,
  form: formReducer
});

export default rootReducer;
