// store.js에서 state 생성함수

import { createSlice } from "@reduxjs/toolkit"

// usestate() 와 비슷한
let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
        // 기존 initialState 값임 => 기존 state 전체값임
        changeName(state){
            // initialState 의 값을 return 값으로 "갈아치운다"
            // state.name 값을 변경해도 변경된 initialState을 복사생성해줌
            state.name = 'park'
            //return 'john ' + state
        },
        // state : 변경전 initialstate
        // actions : 함수 호출할때 넣은 parameter
        changeAge(state, actions){
            state.age = state.age + actions.payload
        }
    }
})

export let { changeName, changeAge } =  user.actions

export default user