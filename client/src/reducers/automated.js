const INITIAL_STATE = {
  get_all: null,
};

export default function automated(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_AUTOMATED":
      return { ...state, get_all: action.payload };
    default:
      return state;
  }
}
