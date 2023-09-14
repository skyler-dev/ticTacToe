// React
import React, { StrictMode } from "react";
// 웹 브라우저와 대화하기 위한 React 라이브러리(React DOM)
import { createRoot } from "react-dom/client";
// 컴포넌드들을 위한 스타일들(the styles for your components)
import "./styles.css";

// App.js에서 생성한 컴포넌트(the component you created in App.js.)
import App from "./App";

// 모든 조각을 한데 모아 최종 결과물을 public 폴더의 index.html에 삽입
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);