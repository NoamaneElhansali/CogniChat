import {createSlice} from '@reduxjs/toolkit'
const session  = createSlice({
    name: 'session',
    initialState: {
        si : [],
        user :{
            email:'',password:'',isLogin:false
        }
    },
    reducers:{
        addSession:(state, action)=> {
            state.si = [...state.si,{id:state.si.length , title : `${action.payload[1].content.slice(0, 30)}...` ,content: action.payload }]
        },
        modifiesession :(state,action)=>{
            const sis = state.si.find(ms =>ms.id === action.payload.id)
            if(sis){
                sis.content = action.payload.message
            }
            
        },
        AddUser:(state, action)=> {
            state.user.email=action.payload.email
            state.user.password=action.payload.password
            state.user.isLogin=false
        },
        verifiaction_login :(state,action)=>{
            if(state.user.email !== '' && state.user.password !== ''){
                if(state.user.email === action.payload.email && state.user.password === action.payload.password){
                    state.user.isLogin=true
                }else{
                    state.user.isLogin=false
                }
            }else{
                state.user.isLogin=false
            }
        },
        logout:(state)=>{
            state.user = {
                email:'',password:'',isLogin:false
            }
            console.log('a')
        }
    }
})
export const {addSession,modifiesession,AddUser,verifiaction_login,logout} = session.actions
export default session.reducer