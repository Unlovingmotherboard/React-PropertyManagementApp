/*
 * action types
 */

export const FROM_ACTION_LOGIN = "FROM_ACTION_LOGIN";
export const FROM_NAVBAR_LOGOUT = "FROM_NAVBAR_LOGOUT";
export const IMPORT_PROPERTIES = "IMPORT_PROPERTIES";
export const SET_FIRSTNAME_FORM = "SET_FIRSTNAME_FORM";
export const SET_APPLICATIONS_FROM_DB = "SET_APPLICATIONS_FROM_DB";
export const SET_UPDATES_FROM_DB = "SET_UPDATES_FROM_DB";
export const GET_UPDATES_FROM_DB = "GET_UPDATES_FROM_DB";
export const GET_PAYMENT_HISTORY_FROM_DB = "GET_PAYMENT_HISTORY_FROM_DB";
export const CONNECTING_TO_HERPESTIDAE = "CONNECTING_TO_HERPESTIDAE";
export const CONFIRMATION_MODAL_DISPLAY ="CONFIRMATION_MODAL_DISPLAY";


//PAYMENT FORM EXPORTS 

export const SET_DATE_PICKER = "SET_DATE_PICKER";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_EXPENSES = "SET_EXPENSES";


export const setDatePicker = (date) => {
  return { type: SET_DATE_PICKER, date: date }
}

export const setPayment = (payment) => {
  return { type: SET_PAYMENT, payment: payment }
}

export const setExpenses = (expenses) => {
  return { type: SET_EXPENSES, expenses: expenses }
}




export const connectingToHerpestidaeOrNahFam = (yuhOrNah) => {
  return { type: CONNECTING_TO_HERPESTIDAE, yuhOrNah: yuhOrNah }
}

export const setFirstName = text => {
  return { type: SET_FIRSTNAME_FORM, firstName: text }
}

export const showConfirmationModal = showOrNah => {
  return { type: CONFIRMATION_MODAL_DISPLAY, showOrNah: showOrNah }
}

export const fromReducerLogin = (token, manORten, userName, renting) => {
  console.log(renting);
  return {type: FROM_ACTION_LOGIN, fromLStoken: token, fromLStype: manORten, fromLSusername: userName, isUserRenting: renting}
}

export const setApplications = (applications) => {
  return {type: SET_APPLICATIONS_FROM_DB, applications};
}

export const setUpdates = (managerUpdates) => {
  return {type: SET_UPDATES_FROM_DB, managerUpdates};
} 

export const getUpdates = (tenantUpdates) => {
  return {type: GET_UPDATES_FROM_DB, tenantUpdates};
} 

export const getPaymenyHistory = (paymenyHistory) => {
  return {type: GET_PAYMENT_HISTORY_FROM_DB, paymenyHistory};
} 

export const importProperties = (propertiesFromHerpestinae) => {
  return {type: IMPORT_PROPERTIES, properties: propertiesFromHerpestinae}
}

export const logout = () => {
  return {type: FROM_NAVBAR_LOGOUT}
}


