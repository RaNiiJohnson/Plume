const initialState = {};

export default function postReducer(
  state = initialState,
  action: { type: unknown }
) {
  switch (action.type) {
    default:
      return state;
  }
}
