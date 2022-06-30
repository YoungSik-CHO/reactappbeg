import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
// import 할땐 export하는 변수명과 똑같이 써야함
import { useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import data from './data.js';
import Detail from './pages/detail.js';

function App() {
  let [shoes] = useState(data);
  // 페이지이동을 도와주는 라이브러리 useNavigate 함수
  let navigate = useNavigate();
  
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
                                    {/* navigate(-1) navigate(1) => 뒤로이동 , 앞으로이동 */}
            <Nav.Link onClick={() => {navigate('/')}} >Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>Cart</Nav.Link>
            <Nav.Link onClick={() => {navigate('/event')}}>Event</Nav.Link>
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
          </>
         } />
         {/* :id : URL Parameter */}
        <Route path='/detail/:id' element={  <Detail shoes={shoes}/> } />

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
