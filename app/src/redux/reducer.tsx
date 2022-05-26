import { combineReducers } from "redux";

interface MemberState {
    member: {
        id?: string
    }
}
interface MemberAction {
    type:string,
    payload : {},
}
const memberReducer = (state:MemberState = {member:{}}, action: MemberAction) => {
    switch (action.type) {
        case "loginMember" :
            return {...state, member:action.payload};
        case "logoutMember" :
            return {...state, member: {}};
        default : 
            return state;
    }
}
const reducers = combineReducers({
    memberReducer,
})

export default reducers