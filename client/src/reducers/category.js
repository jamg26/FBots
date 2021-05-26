const INITIAL_STATE = {
  get_all: null,
};

export default function category(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_CATEGORY":
      return { ...state, get_all: action.payload };
    default:
      return state;
  }
}
