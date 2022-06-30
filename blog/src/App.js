// 경고문 끄는 기능
/* eslint-disable */ 

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  //아직 서버가 없기때문에 임시로 값을 return 받았다고 가정하고 변수작성
  let post = '인천 회 맛집'

  // State 만들기 1. import {useState} 2. UseState(자료) 3. let [작명1, 작명2]
  // a에 자료가 오고 b에 변경을 도와주는 함수가 옴
  // JS의 Destructuring => Destructuring.txt 참조
  // state가 뭐야 => state.txt 참조
  let [subject,setSubject] = useState(['여자 코트 추천','남자 코트 추천', '맛집 추천']);
  let [logo, setLogo] = useState('ReactBlog');    // logo
  let [like, setLike] = useState([0,0,0]);        // like count in subject 
  let [title, setTitle] = useState(0);            // selected subject to modal
  let [inputState, setInputState] = useState(''); //input box 


  // 누른 객체의 좋아요 하기
  let likeup = (i) => {
    like[i] = like[i] + 1
    console.log(copylikeup);
    let copylikeup = Array.from(like);
    setLike([...copylikeup]);
  }

  // 정렬함수 만들어보기
  // Array.prototype.sort() 
  // 1. 아무 param 도 안넣으면 오름차 정렬
  // 2. 내림차 정렬은 return -1
  // 3. 1개의 param => 2번째([1]) 인자부터 끝까지옴
  // 4. 2개의 param => 2번째([1]) 3번째([2]) 인자부터 끝까지옴
  let subjectSort = () => {
    let copySubject = Array.from(subject);
    console.log(copySubject)
    copySubject.sort();
    //console.log(copySubject)
    setSubject([...copySubject]);
  }

  //신규글 작성
  let newSubject = () => {
    let copySubject = Array.from(subject);
    console.log(inputState);
    // 배열 가장뒤에 INSERT
    //copySubject.push(inputState);
    // 배열 가장 처음에 insert
    copySubject.unshift(inputState);
    setSubject([...copySubject]);
    document.querySelector('#_input').value = ''
  }

  // 작성글 삭제
  let deleteSubject = (index) => {
    console.log('deleteSubject')
    let copySubject = Array.from(subject);
    copySubject.splice(index, 1);
    console.log(copySubject);
    setSubject([...copySubject]);
  }

  // modal state
  let [modal, setModal] = useState('close'); // 현 modal의 상태 저장 (close / open)

  // 제목클릭 Event
  // modal == 'close' ? setModal('open') : setModal('close')
  let subjectClick = () => {
    if(modal == 'close') {
      setModal('open') 
    }
    else {
      setModal('close') 
    } 
  }

  // js파일 안에서 html을 작성할 수 있는거는
  // return의 태그가 JSX로 작성되기 때문임 => HTML로 보이지만 JS코드기 때문에
  // JS 문법을 따라야 함
  // return() 안에는 병렬태그 X
  return (
    <div className="App">
        <div className="black-nav">
          {/* react로 style 작성시 object 형식으로 작성({{}}) */}
          {/*<h4 style={ {color : 'red' , fontSize : '16px'}  }>블로그임</h4>*/}
          <h4 >{logo}</h4>
        </div>


        <button onClick={() => {subjectSort();}}> 오름차순 정렬 </button>

        {
          // map 함수로 html 반복하기 ~
          subject.map(function(value, index) {
            return (
              <div className='list' key={index}>
                <h4 onClick= {() => { setTitle(index); subjectClick();}}>
                  { subject[index]}

                  {/* span 태그 클릭하면 상위태그의 click 이벤트가 먹음.
                      span => h4 => div 순으로 클릭한거로 간주됨
                      e.stopPropagation(); 상위태그 이벤트 끄기
                  */}
                  <span onClick={(e) => {likeup(index); e.stopPropagation();}}>👍</span> {like[index]}
                  <button onClick={(e) => {deleteSubject(index); e.stopPropagation();}}> 글 삭 제 </button>
                  </h4>
                <h4>2월 17일 발행</h4>
              </div>
            )
          })
        }

        {/* e : 이벤트객체 태그의 이벤트 관련 object가 담겨있음 */}
        <input id="_input" onInput={(e) => {setInputState(e.target.value);}} />
        <button onClick={() => {newSubject();}}>글 추가</button>
        
        {/* 동적 UI 만드는 Step
          1. HTML / CSS로 디자인하기
          2. UI의 현재 상태를 State로 저장
          3. state로 조건식 저장 후 사용
        */}
        {
          modal == 'open' ? <Modal title={title} subject={subject} color="skyblue"/> : null
        }
        
      
    </div>
  );
}

// Component 만들기
// 1. 함수만들기
// 2. return ( html ~~~) 만들기
// 3. 함수명으로 된 태그를 app.js return 에 쓰기
// component 언제씀? component.txt 참조
// props 객체 안에 <Modal 태그 안에 넣었던 값들이 전부 객체로 온다
const Modal = (props) => {
  return (
    // fragment 태그 <> </> (<div> 대신)
    <>
      <div className='modal' style={{background : props.color}}>
        <h4>{props.subject[props.title]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button>글수정</button>
      </div>
    </>
  )
}

export default App;
