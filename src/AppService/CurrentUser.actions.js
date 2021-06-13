import { db } from "./firebase";
export const FETCH_CURRENT_USER_UPDATED = "FETCH_CURRENT_USER_UPDATED";
export const FETCH_CURRENT_USER_FAILED = "FETCH_CURRENT_USER_FAILED";
export const FETCH_CURRENT_USER_REQUESTED = "FETCH_CURRENT_USER_REQUESTED";
export const FETCH_CURRENT_USER_ADDED = "FETCH_CURRENT_USER_ADDED";
export const FETCH_CURRENT_USER_NOT_FOUND = "FETCH_CURRENT_USER_NOT_FOUND";


export const fetchCurrentUserUpdated = (user) => ({
    type: FETCH_CURRENT_USER_UPDATED,
    payload: user, 
});

export const fetchCurrentUserFailed = (err) => ({
    type: FETCH_CURRENT_USER_FAILED,
    payload: err,
});

export const fetchCurrentUserRequested = () => ({
    type: FETCH_CURRENT_USER_REQUESTED,
});

export const fetchCurrentUserAdded = (user) => ({
    type: FETCH_CURRENT_USER_ADDED,
    payload: user,
});

export const fetchCurrentUserNotFound = () => ({
    type: FETCH_CURRENT_USER_NOT_FOUND,
});


export const getCurrentUser = (user) => {
    return function (dispatch) {
        dispatch(fetchCurrentUserRequested()); 

        const id = user.uid
        db.collection("users").doc(id).get()
            .then((res) => {
                let data = res.data();
                dispatch(
                    fetchCurrentUserUpdated(data) 
                );
            })
            .catch((err) => {
                dispatch(fetchCurrentUserFailed(err)
                );
            })
    }
};

