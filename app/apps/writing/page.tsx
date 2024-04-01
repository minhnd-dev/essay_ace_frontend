"use client";

import { Refresh, AlarmClock, PlayOne, Pause } from "@icon-park/react";
import { useEffect, useState } from "react";

export default function Writing() {
  const [text, setText] = useState("");
  const topic =
    "Increasing globalization has made the world a smaller place. Do you agree or disagree with this statement? Discuss the advantages and disadvantages of globalization, and give your opinion. ";
  return (
    <div>
      <div className="mt-8 m-auto max-w-[1080px]">
        <textarea
          className="border-[1px] p-3 rounded-xl font-bold w-full"
          value={topic}
        ></textarea>
        <div className="mt-2 flex justify-between">
          <button className="bg-white p-2 border-2 hover:bg-gray-100 max-w-min shadow-none">
            <Refresh theme="outline" size="24" fill="#333" />
          </button>
          <WordCounter text={text} />
          <Timer />
        </div>
        <textarea
          autoFocus
          placeholder="Bắt đầu viết ở đây"
          className="rounded-lg w-full min-h-[60vh] mt-2 p-2 border-[1px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="mt-4 mx-auto px-4 py-2">Đánh giá với AI</button>
      </div>
    </div>
  );
}

function WordCounter({ text }: { text: string }) {
  const [target, setTarget] = useState("250");

  function countWords(){
    return text.trim().split(/\s+/).length;
  }
  return (
    <div className="my-auto">
      Target:	&nbsp; 
      {countWords()} /
      <input type="number" className="max-w-8 ml-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={target} onChange={(e) => setTarget(e.target.value)} /> words
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
          <PlayOne theme="outline" size="24" fill="#333" />
        ) : (
          <Pause theme="outline" size="24" fill="#333" />
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
        <AlarmClock theme="outline" size="24" fill="#333" />
      </div>
    </div>
  );
}
