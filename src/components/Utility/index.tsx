
const apiPath = process.env.REACT_APP_API_URL;
const localapipath = process.env.REACT_APP_TEST_URL;
const API=" ";

export const apiAuthenticateUser = `${apiPath}/${API}/Auth/Login`; 
export const getuserslist=`${localapipath}/v1.0/Doctor/GetDoctorList`;
export const registeruser=`${localapipath}/v1.0/Doctor/RegisterDoctor`;

