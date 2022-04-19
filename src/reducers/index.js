import {combineReducers} from 'redux'
import user from './user'
import error from './error'
import item from './items'
import all from './alluser'
import mycar from './allmsg'
import post from './postmsg'
import mybook from './mybook'
import allorders from './allorders'

export default (combineReducers)({
    item,
    user,
    error,
    all,
    mycar,
    post,
    mybook,
    allorders
})