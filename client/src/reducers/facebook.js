const INITIAL_STATE = {
  fb_page_tokens: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FB_PAGE_TOKENS":
      return { ...state, fb_page_tokens: action.payload };
    default:
      return state;
  }
}
