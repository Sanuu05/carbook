const initail ={
    allorders:[]
}
const allmsg = (state=initail, action)=>{
    switch(action.type){
        
        case "ALLORDERS":
            return{
                allorders:action.payload.data
            }    
        default:
            return state    
    }
}
export default allmsg