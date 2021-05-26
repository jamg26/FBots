const INITIAL_STATE = {
  get_all: null,
  get: null,
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, get_all: action.payload };
    case "GET_USERS_CURRENT":
      return { ...state, get: action.payload };
    default:
      return state;
  }
}
