/*
 * action types
 */

export const FROM_ACTION_LOGIN = "FROM_ACTION_LOGIN";
export const FROM_NAVBAR_LOGOUT = "FROM_NAVBAR_LOGOUT";
export const IMPORT_PROPERTIES = "IMPORT_PROPERTIES";
export const SET_FIRSTNAME_FORM = "SET_FIRSTNAME_FORM";
export const SET_APPLICATIONS_FROM_DB = "SET_APPLICATIONS_FROM_DB";

export const setFirstName = text => {
  return { type: SET_FIRSTNAME_FORM, firstName: text }
}

export const fromReducerLogin = (token, manORten, userName, renting) => {
  console.log(renting);
  return {type: FROM_ACTION_LOGIN, fromLStoken: token, fromLStype: manORten, fromLSusername: userName, isUserRenting: renting}
}

export const setApplications = (applications) => {
  return {type: SET_APPLICATIONS_FROM_DB, applications};
}

export const importProperties = (propertiesFromHerpestinae) => {
  return {type: IMPORT_PROPERTIES, properties: propertiesFromHerpestinae}
}

export const logout = () => {
  return {type: FROM_NAVBAR_LOGOUT}
}


