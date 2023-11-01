import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist()

export const UserIdAtom = atom({
    key:"UserIdAtom",
    default :null,
    effects_UNSTABLE:[persistAtom]
})

export const UserInfoAtom = atom({
    key: "userInfoAtom",
    default:{
        address:"",
        username: "",
        phoneNum:""
    },
    effects_UNSTABLE:[persistAtom]
})
