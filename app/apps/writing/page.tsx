export default function Writing() {

    const topic = "Increasing globalization has made the world a smaller place. Do you agree or disagree with this statement? Discuss the advantages and disadvantages of globalization, and give your opinion. "
  return (
    <div>
      <div className="mt-8 m-auto max-w-[1000px]">
        <p className="font-bold text-xl p-2">{topic}</p>
        <textarea autoFocus placeholder="Bắt đầu viết ở đây" className="outline-none rounded-xl w-full min-h-[60vh] outline-1 text-xl mt-8 p-2 shadow-2xl">
        </textarea>
        <button className="mt-4 mx-auto block bg-black text-white rounded-xl shadow-3xl px-4 py-2 text-xl hover:bg-gray-800">Đánh giá với AI</button>
      </div>
    </div>
  );
}
