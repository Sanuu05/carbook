const initial = {
    postmsg: null,
    delemsg: [],
    updatepic: [],
    ordersuc: null
}

const post = (state = initial, action) => {
    switch (action.type) {
        case "POSTMSG":
            return {
                postmsg: action.payload.data
            }

        case "ORDERSUCC":
            return {
                ordersuc: action.payload.data
            }
        case "DELEMSG":
            return {
                delemsg: action.payload.data
            }
        case "UPDATE_PIC":
            return {
                updatepic: action.payload
            }
        default: return state
    }

}
export default post
