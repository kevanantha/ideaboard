import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import ideaReducer from './ideaReducer';

export default combineReducers({
  ideas: ideaReducer,
  form
})
