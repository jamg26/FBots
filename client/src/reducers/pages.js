const INITIAL_STATE = {
  get_all: null,
  stats: null,
};

export default function pages(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_PAGES":
      return { ...state, get_all: action.payload };
    default:
      return state;
  }
}
