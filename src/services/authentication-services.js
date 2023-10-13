import { createUserFirebase, readMultipleUserFirebase, readUserFirebase } from "../repos/authentication-repos"


export function createUser(formData,userID, callbackFn) {
    return (
        createUserFirebase(formData,userID)
            .then(res => callbackFn?.(res))
    )
}

export function readUserData(uid, callbackFn) {
    return readUserFirebase(uid)
        .then(json => {
            callbackFn?.(json)
            return json
        })
}

export function readMultipleUserData(callbackFn) {
    return readMultipleUserFirebase()
        .then(json => {
            return json
        })
        .then(
            res => callbackFn?.(Object.values(res))
        )
}

