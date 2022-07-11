import { createSlice } from "@reduxjs/toolkit";

let userCart = createSlice({
    name : 'userCart',
    initialState : [
        {id : 0, name : 'White and Black' , count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        countUp(state, actions) {
            //actions에는 선택된 장바구니의 id를 받아와서
            // state중에 id가 같은 state object를 찾은 다음에 
            // count 변수를 변경해준다.
            let newState = state.find(e => e.id === actions.payload);
            newState.count += 1;
            // 아래로 간단하게 쓸수 있음
            // let stateIndex = state.findIndex(e => e.id === actions.payload);
            // state[stateIndex].count++;
        },
        add(state, actions) {
            // 받은 parameter의 id를 받아 현재 장바구니 json에 존재하는지 검사
            let isExist = state.find(e => e.id === actions.payload.id);
            // 이미 존재한다면 count + 1
            if(isExist) {
                isExist.count += 1
            }
            // 존재하지 않다면 새 장바구니 데이터 생성
            else {
                state.push({
                    id : actions.payload.id,
                    name : actions.payload.title,
                    count : 1
                });
            }   
        },
        // 장바구니 삭제
        removeItem(state, actions) {
            console.log(actions.payload)
            let selectedIndex = state.findIndex(e => e.id === actions.payload);
            console.log(selectedIndex)
            state.splice(selectedIndex , 1);
        }
    }
})

export let { countUp, add, removeItem } = userCart.actions

export default userCart