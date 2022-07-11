// redux 설치방법
// 1. npm install @reduxjs/toolkit react-redux
// 2. store.js 생성 (state 보관통)
// 3. index.js 가서 <Provider store={store} 쓰기>

import { configureStore, createSlice} from "@reduxjs/toolkit";
import user from './store/userSlice.js'
import userCart from './store/stockSlice.js'




// Redux state 변경법
// 1. stock 변수 안에 수정해주는 메소드(reducers) 생성해야함
// 2. stock 변수 바깥에 export let { changeName } =  user.actions 방식으로 export 함
let stock = createSlice({
    name : 'stock',
    initialState : [10,11, 12],

});




export default configureStore ({
    reducer : {
        // 선언한 createSlice + .reducer
        user : user.reducer,
        stock : stock.reducer,
        userCart : userCart.reducer
    }
});

