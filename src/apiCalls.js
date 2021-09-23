import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  
  const { REACT_APP_BACKEND_API_LINK } = process.env;
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      `${REACT_APP_BACKEND_API_LINK}/auth/login`,
      userCredential
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
}; 