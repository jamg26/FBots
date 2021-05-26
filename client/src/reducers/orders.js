const INITIAL_STATE = {
  get_all: null,
  stats: null,
};

export default function orders(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_ORDERS":
      return { ...state, get_all: action.payload };
    case "GET_ORDERS_STATS":
      return { ...state, stats: action.payload };
    default:
      return state;
  }
}
