import axios from "axios";

export const getFbTokens = (fbCreds) => async (dispatch) => {
  const data = await axios.post("/api/facebook/pageTokens", fbCreds);
  dispatch({ type: "FB_PAGE_TOKENS", payload: data.data });
};
