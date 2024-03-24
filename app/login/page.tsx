"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PreviewClose, PreviewOpen } from "@icon-park/react";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [authFailed, setAuthFailed] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  async function login() {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: userName,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      router.push("/");
      console.log(data);
    } else {
      setAuthFailed(true);
    }
  }

  function toggleShowPwd() {
    setShowPwd(!showPwd);
  }
  return (
    <div className="min-h-screen min-w-screen">
      <div className="mx-auto py-[10vh] max-w-[500px] max-h-screen">
        <div className="rounded-3xl shadow-2xl">
          <div className="bg-white rounded-2xl p-4">
            <p className="text-center text-4xl font-bold py-10">Đăng nhập</p>
            <div className="mx-10">
              <div className="mb-16 grid grid-cols-1 gap-8">
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  className="bg-gray-100 text-l rounded-l p-2"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <div className="flex">
                  <input
                    type={showPwd ? "text": "password"}
                    placeholder="Mật khẩu"
                    className="bg-gray-100 text-l rounded-l p-2 w-full"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPwd ? (
                    <PreviewOpen
                      theme="outline"
                      size="24"
                      fill="#333"
                      className="my-auto ml-[-32px] cursor-pointer"
                      onClick={toggleShowPwd}
                    />
                  ) : (
                    <PreviewClose
                      theme="outline"
                      size="24"
                      fill="#333"
                      className="my-auto ml-[-32px] cursor-pointer"
                      onClick={toggleShowPwd}
                    />
                  )}
                </div>
                {authFailed && (
                  <p className="text-red-600 text-sm">
                    Tên đăng nhập hoặc mật khẩu chưa đúng
                  </p>
                )}
                <button
                  onClick={login}
                  className="w-full mx-auto px-4 py-2 text-xl"
                >
                  Đăng nhập
                </button>
                <p className="text-center italic text-gray-400">
                  Bạn chưa có tài khoản?{" "}
                  <a href="/sign-up" className="text-black">
                    Đăng ký tại đây
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
