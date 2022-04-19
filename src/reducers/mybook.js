const initail ={
    book:[]
}
const allmsg = (state=initail, action)=>{
    switch(action.type){
        
        case "MYBOOK":
            return{
                book:action.payload.data
            }    
        default:
            return state    
    }
}
export default allmsg