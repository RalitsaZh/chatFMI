import { combineReducers } from 'redux';
import currentUserReducer from "../AppService/CurrentUser.reducer"
const rootReducer = combineReducers({
        currentUser:currentUserReducer,
});

export default rootReducer;