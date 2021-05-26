const INITIAL_STATE = {
  authenticated: "",
  errorMessage: "",
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "AUTH_USER":
      return { ...state, authenticated: action.payload };
    case "AUTH_ERROR":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
