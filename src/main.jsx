// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './styles/index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

//가상돔요소를 생성해주는 리액트 객체 가져옴
// import React from "react";  
//붉은 밑줄 생기는 이유: 정의된 요소인데 사용이 되지 않았음을 표시
//리액트 객체가 생성한 리액트 요소를 일반돔으로 변환하는 객체
import ReactDOM from "react-dom/client";
//루트 컴포넌트 (리액트요소를 반환해주는 함수)
import App from "./App.jsx";
//루트 컴포넌트에 적용할 전체 스타일파일
import "./styles/index.scss";

//App이라는 마스터컴포넌트를 돔형태로 구현해서 index.html의 #root요소안에 넣어줌
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
