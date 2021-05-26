const INITIAL_STATE = {
  get_all: null,
};

export default function product(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, get_all: action.payload };
    default:
      return state;
  }
}
