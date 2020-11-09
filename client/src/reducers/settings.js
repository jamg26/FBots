const INITIAL_STATE = {
  get: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_SETTINGS":
      return { ...state, get: action.payload };
    default:
      return state;
  }
}
