import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeAge } from '../store/userSlice.js'
import { countUp, add, removeItem } from '../store/stockSlice.js'
import store from '../store';


let Cart = () => {
    // store 가져오는 함수
    let storeState = useSelector((state) => state );
    //console.log(storeState)

    // dispatch : store.js에 요청을 보내주는 함수
    let dispatch = useDispatch();

    return (
        <>
            <h6>{storeState.user.name} {storeState.user.age}의 장바구니</h6>
            <button onClick={() => {
                // 수정함수에 parameter 보낼수 있음
                dispatch(changeAge(3));
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
            { 
                storeState.userCart.map((v, i) => {
                    return (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.name}</td>
                            <td>{v.count}</td>
                            <td><button onClick={()=> {
                                dispatch(countUp(v.id));
                            }}>+</button></td>
                            <td><button onClick={() => {
                                dispatch(removeItem(v.id));
                            }}>x</button></td>
                        </tr>
                    )
            })
            }
                </tbody>
            </Table> 
        </>
    )
}

export default Cart;
