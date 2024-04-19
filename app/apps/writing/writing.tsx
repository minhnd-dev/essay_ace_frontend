"use client";

import {Refresh, AlarmClock, PlayOne, Pause} from "@icon-park/react";
import {useEffect, useState} from "react";
import fetchWithToken from "@/app/utils/api";
import {Button} from "@/components/ui/button";

export default function Writing({topicIdProp = null}: { topicIdProp: number | null }) {
  const [question, setQuestion] = useState();
  const [AIFeedBack, setAIFeedBack] = useState();
  const [savedAt, setSavedAt] = useState("");
  const [response, setResponse] = useState("");
  const [responseId, setResponseId] = useState();
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [loadingAIFeedback, setLoadingAIFeedback] = useState(false);
  const [topicId, setTopicId] = useState(topicIdProp);

  useEffect(() => {
    if(topicId !== null) {
      fetchWithToken("http://localhost:5000/topic/" + topicId, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setQuestion(data.data.content);
          setLoadingQuestion(false);
          if (data.data.response?.content) {
            setResponse(data.data.response.content);
            setSavedAt(formatDate(new Date(data.data.response.updated_at)));
          }
          if (data.data.feedback?.content) {
            setAIFeedBack(data.data.feedback.content)
          }
      })
    }
  }, [topicId]);

  function generateQuestion() {
    fetchWithToken("http://localhost:5000/topic/ai", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.data);
        setLoadingQuestion(false);
      })
  }

  useEffect(() => {
    if (topicId == null) {
      console.log("generating")
      generateQuestion();}
  }, []);

  function handleRefreshQuestion() {
    setLoadingQuestion(true);
    generateQuestion();
  }

  function getAIFeedback() {
    setLoadingAIFeedback(true);
    fetchWithToken("http://localhost:5000/feedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({response_id: responseId}),
      })
      .then((res) => res.json())
      .then((data) => {
        setAIFeedBack(data.data.feedback);
        setLoadingAIFeedback(false);
      })

  }

  function formatDate(date: Date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  function save() {
    fetchWithToken("http://localhost:5000/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "topic_content": question,
        "content": response
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseId(data.data.response_id);
        setTopicId(data.data.topic_id);
        setSavedAt(formatDate(new Date()));
      })
  }

  return (
    <div className="mt-8 m-auto max-w-[1080px] px-4">
      <div className="border-[1px] p-3 rounded-xl font-bold w-full">
        {loadingQuestion ? <span className="loading loading-spinner loading-sm text-center"></span> :
          <textarea className="rounded-xl font-bold w-full outline-none" value={question}></textarea>
        }
      </div>
      <div className="mt-2 flex justify-between">
        <Button className="bg-white p-2 border-[1px] hover:bg-gray-100 max-w-min shadow-none"
                onClick={handleRefreshQuestion}>
          <Refresh theme="outline" size="24" fill="#333"/>
        </Button>
        <WordCounter text={response}/>
        {/*<Timer/>*/}
      </div>
      <div className="rounded-lg w-full min-h-[60vh] mt-2 p-2 border-[1px]">
        <textarea
          autoFocus
          placeholder="Bắt đầu viết ở đây"
          className="rounded-lg w-full min-h-[60vh] mt-2 outline-none"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        ></textarea>
        <div className="">

        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <Button className="m-2 my-4 ml-0 px-4 py-2 bg-gray-300 text-black hover:bg-black hover:text-white"
                  onClick={save}>Lưu
          </Button>
          {savedAt && <Button className="m-2 my-4 px-4 py-2" onClick={getAIFeedback}>Đánh giá với AI ✨</Button>}

        </div>
        {savedAt && <p className="m-2 my-4 py-2">Đã lưu lúc {savedAt}</p>}
      </div>
      <div>
        {loadingAIFeedback ? <span className="loading loading-spinner loading-sm text-center"></span> :
          AIFeedBack &&
            <textarea className="w-full outline-none h-[800px]" value={AIFeedBack}></textarea>
        }
      </div>
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
             className="max-w-8 ml-2 [appearance:textfield] [&::-webkit-outer-spin-Button]:appearance-none [&::-webkit-inner-spin-Button]:appearance-none"
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
    <div className="flex bg-white border-[1px] hover:bg-white max-w-min shadow-none rounded-lg">
      <Button
        onClick={(e) => setPausing(!pausing)}
        className="bg-white p-2 border-none hover:bg-gray-100 max-w-min shadow-none"
      >
        {pausing ? (
          <PlayOne theme="outline" size="24" fill="#333"/>
        ) : (
          <Pause theme="outline" size="24" fill="#333"/>
        )}
      </Button>

      <div className="flex p-2 border-l-[1px] pl-[1px] gap-2 items-center">
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
