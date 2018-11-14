const initState = {
  idea: []
}

const ideaReducer = (state = initState, action) => {
  const ideas = action.payload;
  // console.log('action.paylaod', action.payload)
  //if (action.type === "IDEA/LOAD_ALL_IDEAS") {
    //return { ...state, ideas }
  //}

  return {...state, ideas}
}

export default ideaReducer;
