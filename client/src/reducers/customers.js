const INITIAL_STATE = {
  get_all: null,
};

export default function customer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_CUSTOMERS":
      return { ...state, get_all: action.payload };
    default:
      return state;
  }
}
