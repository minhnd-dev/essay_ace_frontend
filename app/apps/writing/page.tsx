"use client";

import {Refresh, AlarmClock, PlayOne, Pause} from "@icon-park/react";
import {useEffect, useState} from "react";

export default function Writing() {
  const [question, setQuestion] = useState();
  const [loadingQuestion, setLoadingQuestion] = useState(true);

  function generateQuestion() {
    fetch("http://localhost:5000/topic/ai", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.data);
        setLoadingQuestion(false);
      })
  }

  useEffect(() => {
    generateQuestion();
  }, []);
  const [text, setText] = useState("");

  function handleRefreshQuestion() {
    setLoadingQuestion(true);
    generateQuestion();
  }

  return (
    <div className="mt-8 m-auto max-w-[1080px] px-4">
      <div className="border-[1px] p-3 rounded-xl font-bold w-full">
        {loadingQuestion ? <span className="loading loading-spinner loading-sm text-center"></span> :
          <textarea className="rounded-xl font-bold w-full outline-none" value={question}></textarea>
        }
      </div>
      <div className="mt-2 flex justify-between">
        <button className="bg-white p-2 border-2 hover:bg-gray-100 max-w-min shadow-none"
                onClick={handleRefreshQuestion}>
          <Refresh theme="outline" size="24" fill="#333"/>
        </button>
        <WordCounter text={text}/>
        <Timer/>
      </div>
      <div className="rounded-lg w-full min-h-[60vh] mt-2 p-2 border-[1px]">
        <textarea
          autoFocus
          placeholder="Bắt đầu viết ở đây"
          className="rounded-lg w-full min-h-[60vh] mt-2 outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="">

        </div>
      </div>
      <button className="mt-4 mx-auto px-4 py-2">Đánh giá với AI</button>
    </div>
  );
}

function WordCounter({text}: { text: string }) {
  const [target, setTarget] = useState("250");

  function countWords() {
    return text.trim().split(/\s+/).length;
  }

  return (
    <div className="my-auto">
      Mục tiêu:  &nbsp;
      {countWords()} /
      <input type="number"
             className="max-w-8 ml-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
             value={target} onChange={(e) => setTarget(e.target.value)}/> từ
    </div>
  );
}

function Timer() {
  const [minute, setMinute] = useState("20");
  const [second, setSecond] = useState("00");
  const [pausing, setPausing] = useState(true);

  useEffect(() => {
    setMinute(minute.replace(/\D/g, ""));
    setSecond(second.replace(/\D/g, ""));
  }, [minute, second]);

  useEffect(() => {
    if (!pausing) {
      let m = parseInt(minute);
      let s = parseInt(second);
      if (m > 0 || s > 0) {
        let timer = setInterval(() => {
          s--;
          if (s < 0) {
            m--;
            if (m < 0) {
              setPausing(true);
              return () => clearInterval(timer);
            } else {
              s = 59;
            }
          }
          let mString = String(m);
          let sString = String(s);
          if (m < 10) {
            mString = "0".concat(mString);
          }
          if (s < 10) {
            sString = "0".concat(sString);
          }
          setMinute(mString);
          setSecond(sString);
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, [pausing]);

  return (
    <div className="flex bg-white border-2 hover:bg-white max-w-min shadow-none rounded-lg">
      <button
        onClick={(e) => setPausing(!pausing)}
        className="bg-white p-2 border-none hover:bg-gray-100 max-w-min shadow-none"
      >
        {pausing ? (
          <PlayOne theme="outline" size="24" fill="#333"/>
        ) : (
          <Pause theme="outline" size="24" fill="#333"/>
        )}
      </button>

      <div className="flex p-2 border-l-2 pl-[1px] gap-2 items-center">
        <div className="flex">
          <input
            type="text"
            maxLength={3}
            className="text-black w-8 border-none outline-none text-right"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          ></input>
          <p className="text-black mx-[1px]">:</p>
          <input
            type="text"
            maxLength={2}
            max={60}
            className="text-black max-w-5 border-none outline-none text-left"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
          ></input>
        </div>
        <AlarmClock theme="outline" size="24" fill="#333"/>
      </div>
    </div>
  );
}
