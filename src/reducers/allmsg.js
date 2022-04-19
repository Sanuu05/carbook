const initail ={
    mycars:[]
}
const allmsg = (state=initail, action)=>{
    switch(action.type){
        
        case "MYCARS":
            return{
                mycars:action.payload.data
            }    
        default:
            return state    
    }
}
export default allmsg