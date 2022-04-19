const initail ={
    allcars:[]
}
const all = (state=initail, action)=>{
    switch(action.type){
        case "GETALLCARS":
            return {
                allcars:action.payload.data
            }
        // case "USERMSG":
        //     return{
        //         allmsg:action.payload.data
        //     }    
        default:
            return state    
    }
}
export default all