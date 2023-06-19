'use client'

import html2canvas from "html2canvas"; //캡처하게 해주는 라이브러리
import { saveAs } from "file-saver"; //파일 저장을 도와주는 라이브러리
import { useRef } from "react";

export default function App() {
  const divRef = useRef(null);

  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  return (
    <div className="App">
      <div
        ref={divRef}
        style={{ backgroundColor: "#ffdd", width: "300px", height: "200px" }}
      >
        <h1>당신의 결과는 입니다.</h1>
        <h2>당신은 ~한 사람입니다.</h2>
      </div>
      <button onClick={handleDownload}>다운로드</button>
    </div>
  );
}