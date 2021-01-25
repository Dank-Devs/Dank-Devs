const initialState = {
    name: "Dummy Name",
    id: "demoID",
    repos:["deno","gatsby","cgal"]
};

export default (state = initialState, { type, payload }) => {
  return state;
};
