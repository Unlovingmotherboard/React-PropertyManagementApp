/*
 * action types
 */

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const SET_ADD_FORM = "SET_ADD_FORM";
export const CLEAR_ADD_FORM = "CLEAR_ADD_FORM";





export const SET_FIRSTNAME_FORM = "SET_FIRSTNAME_FORM";

export const setFirstName = text => {
  return { type: SET_FIRSTNAME_FORM, firstName: text }
}






export const addItem = text => {
  return { type: ADD_ITEM, text: text, key: Date.now() };
};

export const deleteItem = key => {
  return { type: DELETE_ITEM, key: key };
};

export const setAddForm = text => {
  return { type: SET_ADD_FORM, firstName: text };
};

export const clearAddForm = () => {
  return { type: CLEAR_ADD_FORM, text: "", key: "" };
};
