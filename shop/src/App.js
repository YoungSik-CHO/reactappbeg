import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
// import 할땐 export하는 변수명과 똑같이 써야함
import { createContext, useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import dataOri from './data.js';
import Detail from './pages/detail.js';
import Cart from './pages/cart.js';
import axios from 'axios';
import { Provider } from 'react-redux';
import {useQuery} from 'react-query';



// Context를 하나 만들어줌 Context가 뭔데? => 그냥 state 보관함(state 공유를 위해 )
export let Context1 = createContext();

function App() {
  useEffect(() => {
    // 최근본항목 넣어놓기 위한 'watched' 이름의 storage 생성
    localStorage.setItem('watched', JSON.stringify([]));
  }, [])

  let [shoes,setShoes] = useState(dataOri);
  let [stork, setStork] = useState([10,11,12]);
  // 페이지이동을 도와주는 라이브러리 useNavigate 함수
  let navigate = useNavigate();

  // 서버에서 이름을 가져와서 출력하기
  // + react-query를 이용해서 ajax 요청하기
  // react-query 장점 1 : 실패하면 다시 알아서 요청함
  //             장점 2 : 자식컴포넌트가 같은 경로로 똑같은 호출을 해도 중복 싫행하지 않고 1번만 실행됨
  //             장점 3 : 캐싱기능(5분)이 있어서 5분이내에 다시 요청할 경우 처음 요청했던 데이터를 기본으로 보여주고 나서 ajax 요청 결과값을 보여줌 => 빨라보임
  let result = useQuery('getName', () => {
    console.log('getName by react-query')
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => a.data )
  }, 
  {staleTime : 2000} // 호출 주기 설정하기
  )
  // react-query의 반환값
  console.log(result.data);
  // react-query가 loading일때 true
  console.log(result.isLoading);
  // react-query가 요청실패하면 true
  console.log(result.error);

  


  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
                                    {/* navigate(-1) navigate(1) => 뒤로이동 , 앞으로이동 */}
            <Nav.Link onClick={() => {navigate('/')}} >Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
            <Nav.Link onClick={() => {navigate('/event')}}>Event</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {result.isLoading && '로딩중'}
            {result.error && '로딩중'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      {/* Usenavigate 쓰면 link 태그 안서도댐 */}
      {/* 
      <Link to={'/'}>홈</Link>
      <Link to={'/detail'}>상세페이지</Link> */}

      {/* Routes : Route 모아놓기 */}
      {/* Route : 페이지 분리 컴포넌트 */}
      {/* Link : Route의 path에 도움주는 태그 */}
      <Routes>
        <Route path='/' element= { 
          <>
            <div className='main-bg' style={ { backgroundImage : 'url(' + bg + ')'}}></div>
            <div className='container'>
              <div className='row'>
                  {
                    shoes.map((v, i) => {
                      return (<Card shoes={shoes[i]} onClick={()=> {navigate('/detail/' + shoes[i].id); }} />)
                    })
                  }
              </div>
            </div>
            <button onClick={() => {
              // axios 기본구문
              axios.get('https://codingapple1.github.io/shop/data2.json').then((data) => {
                data.data.forEach(element => {
                  // 받아온 데이터중 이미 존재하는 데이터는 뿌리지 않음
                  if (dataOri.filter((e) => {return e.id == element.id }).length < 1  ){
                    dataOri.push(element);
                  }
                });
                setShoes([...dataOri]);
              }).catch(() => {
                console.log('요청에 실패');
              });

              // 두가지 이상의 요청이 둘다 성공했을때 수행하려면 promise 구문으로 axios를 넣어줌
              // Promise.all(axios.get('/url'), axios.get('/url'))

              // fetch('url') 로도 호출할 수 있지만 .then(jsonstring => json) 과 같은 변환구문을 넣어줘야댐
              // axios는 그러한 변환도 알아서 해주는 라이브러리


            }}>버튼</button>
          </>
         } />
         {/* :id : URL Parameter */}
        <Route path='/detail/:id' element={ 
          // Context 쓰고싶을떄 쓰기
          // <Context1.Provider value={{stork}}> 
          //   <Detail shoes={shoes}/> 
          // </Context1.Provider>   } 
          <Detail shoes={shoes}/> 
        }
        />

        <Route path='/cart' element= {
            <Cart/>
        } />

        {/* Route 안에 Route도 가능하다 => nested route , 태그는 상위,하위 둘다 보여줌 */}
        <Route path="/about" element={<About/>}>
          <Route path='member' element={<div>멤버이;ㅁ</div>}> </Route>
          <Route path='location' element={<div>회사위치야</div>}></Route>
        </Route>
        {/* path='*' => Route 태그에 지정된 path 이외에 아무거나 */}
        <Route path='*' element={<div>없는 페이지임</div>}></Route>

        <Route path='event' element={<Event/>}>
          <Route path='one' element={<div> 첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div> 생일기념 쿠폰받기</div>}></Route>
        </Route>
      </Routes>


    </div>
  );
}

let Card = (props) => {
  return (
    // onclick 같은 이벤트도 자식한테 props로 전달할 수 있음
    <div className='col-md-4'>
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.shoes.id + 1) + ".jpg"}
           onClick={()=> {props.onClick();}}
           width="80%"></img>
      <h4 id={props.shoes.id}
          onClick={()=> {props.onClick();}}
           >{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  )
}

let About = () => {
  return (
    <div>
      <h4>회사정보야</h4>
      {/* 하위 route가 보여질곳 */}
      <Outlet></Outlet>
    </div>
  )
}

let Event = () => {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


export default App;
