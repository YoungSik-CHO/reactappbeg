import  {useParams}  from 'react-router-dom';
import  data  from '../data.js';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';

// import {Context1} from './../App.js'

// style-components 사용해서 button 태그의 style을 작성하는법
// 동적인 배경색을 두고싶다면
let YellowBtn =  styled.button`
     background : ${props => props.bg};
     color : black;
     padding : 10px;
`
 let Box = styled.div`
    background : grey;
    padding : 20px;
 `

let Detail = (props) => {

    // let {stork} = useContext(Context1);

    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [isNumber, setIsNumber] = useState(true);
    // tab state
    let [tab, setTab] = useState(0);

    // 페이지 자체에 애니메이션 주기
    let [fade, setFade] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setFade('end')
        }, 100);
        return () => {
            setFade('')
        }
    }, [props])


    // Component를 렌더링, 재렌더링 한 '후에' 실행되는 hook
    // 화면 랜더링 후에 실행되는 코드기 때문에 보다 어려운연산을 할때는 UseEffect 사용
    // Side Effect(메인기능이 아닌) 기능들로 사용하자
    useEffect(() => {
        let timeout = setTimeout(() => {
            setAlert(false)
        }, 2000);

        // useEffect 동작 전이 실행되는 구문
        // 코드의 중복이 많이 나올 수 있기 때문에 기존코드 제거시에 주로 사용
        // return() 은 mount시에는 실행안됨. update or unmount 시에 실행됨
        return () => {
            // setTimeout제거
            clearTimeout(timeout);
        } 
    }, [count]);
    // , [] => dependancy , useEffrect의 실행조건 넣을 곳, + [] 으로 해놓으면 mount 시에만 실행됨(재랜더링안댐)
    // , [count] => count 변수가 변경될때만 실행하는 조건



    // 사용자가 url뒤에 입력한 parameter가 날아옴
    let {id} = useParams();
    // param에 날아온 id를 data.js의 object에서 찾아서 바인딩
    let datafilter = data.filter((v, i) => {
        if (v.id == id)
            return true
    }) 

    // 입력한 Input 태그가 숫자인지 아닌지 판별하는 함수
    // 이거말고 useEffect(() => {}, [IsNumber])
    let numberCheck = (value) => {
         if (isNaN(value))  {
            setIsNumber(false);
        } else {
            setIsNumber(true);
        }
    }

    return (
        <div className={`container start ${fade}`} >
            {alert == true ? <AlertWarning/> : null } 
            {/* <Box>
                <YellowBtn bg="blue">버튼</YellowBtn>
                <YellowBtn bg="red">d</YellowBtn>
            </Box> */}
        <div className="row">
            <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes" + (datafilter[0].id + 1) + ".jpg"} width="100%" />
            </div>
            <div className="col-md-6">
                { isNumber ? null : <div>숫자만 입력하세요</div>}
                <input onChange={(e)=> { numberCheck(e.target.value) }} />
                <h4 className="pt-5">{datafilter[0].title}</h4>
                <p>{datafilter[0].content}</p>
                <p>{datafilter[0].price}</p>
                <button className="btn btn-danger">주문하기</button> 
            </div>
        </div>
            {/* react-bootstrap 기반 탭 UI */}
            <Nav variant='tabs' defaultActiveKey="link0" >
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => {setTab(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => {setTab(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => {setTab(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            {/* 탭 */}
            <Tab tabIndex={tab} shoes={props.shoes} id={datafilter[0].id}/>


        </div> 
    )
}

// tab 리턴하는 편법
let Tab = (props) => {
    // props가 변경될때 실행
    let [fade, setFade] = useState('');

    useEffect(() => {
        // Fade가 'end'가 아닌 값에서 'end'로 변경되어야 transition이 실행됨
        // 따라서 ''을 실행한 후 랜더링되는 시간이 지나고나서 end로 변경해야 정상적인 애니메이션이 작동된다.

// 왜? react 18은 automatic batch 기능이 추가됨
// 하나의 scope안에서 같은 메서드를 다른인자로 실행할때 최종적으로 실행되는 1개의 메서드만 실행한다.
// 따라서 일정 시간term을 주지 않고 같은메서드(setFade) 를 실행하면 setFade('end') 만 실행되므로 
// setTimeout으로 시간term을 줘야 함
        setTimeout(() => {
            setFade('end')
        }, 100);
        return () => {
            setFade('')
        }
    }, [props])

    return (<div className={`start ${fade}`}>
            {[<div>{props.shoes[props.id].title}</div>, <div>{props.shoes[props.id].content}</div>, <div>{props.shoes[props.id].price}</div>][props.tabIndex]}
            </div>);
}


let AlertWarning = () => {
    return (
        <div className='alert alert-warning'>
            2초이내 구매시 할인
        </div>
    )
}

export default Detail;