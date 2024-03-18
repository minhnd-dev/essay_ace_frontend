"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PreviewClose, PreviewOpen, Success } from "@icon-park/react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter()
  const [registerSuccess, setRegisterSuccess] = useState(false);

  function goToLogin() {
    router.push("/login");
  }
  return ! registerSuccess ? (
    <SignUpForm setRegisterSuccess={setRegisterSuccess} />
  ) : (
    <div className="min-h-screen min-w-screen">
      <div className="mx-auto py-[10vh] max-w-[500px] max-h-screen">
        <div className="rounded-3xl shadow-2xl">
          <div className="bg-white rounded-2xl p-4 gap-4">
            <div className="flex gap-2 justify-center mb-8">
              <Success theme="outline" size="50" fill="#333" />
              <p className="my-auto text-2xl font-bold">Đăng ký thành công!</p>
            </div>
            <p className="text-center">Cảm ơn bạn đã tham gia hệ thống của chúng tôi. Ấn nút đăng nhập để bắt đầu hành trình cải thiện kĩ năng viết tiếng anh của bạn ;	&#41;</p>
            <button onClick={goToLogin} className="mx-auto my-4 block bg-black text-white rounded-l shadow-3xl px-4 py-2 text-xl hover:bg-gray-800">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignUpForm({ setRegisterSuccess } : {setRegisterSuccess: Dispatch<SetStateAction<boolean>>}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    checkRetypePassword();
  }, [password, password2]);

  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [retypeWrong, setRetypeWrong] = useState(false);

  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");
  const [userPasswordErrorMsg, setPasswordErrorMsg] = useState("");

  function toggleShowPwd() {
    setShowPwd(!showPwd);
  }

  function toggleShowPwd2() {
    setShowPwd2(!showPwd2);
  }

  function checkRetypePassword() {
    setRetypeWrong(password2 !== password);
  }

  function validateUserName(input: string) {
    if (input.length < 4 || input.length >= 128) {
      setUserNameErrorMsg("Tên đăng nhập cần có độ dài từ 4 - 128 ký tự");
    } else if (!/^[a-zA-Z0-9_]+$/.test(input)) {
      setUserNameErrorMsg(
        "Tên đăng nhập chỉ được phép chứa chữ viết hoa, viết thường hoặc dấu gạch dưới (_)."
      );
    } else {
      setUserNameErrorMsg("");
    }
  }

  function validatePassword(input: string) {
    if (input.length < 8 || input.length >= 128) {
      setPasswordErrorMsg("Mật khẩu cần có độ dài từ 8 - 128 ký tự");
    } else {
      setPasswordErrorMsg("");
    }
  }

  async function register() {
    if (
      userNameErrorMsg === "" &&
      userPasswordErrorMsg === "" &&
      !retypeWrong
    ) {
      const response = await fetch("http://localhost:5000/auth/register", {
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
        setRegisterSuccess(true);
      }
    }
  }

  return (
    <div className="min-h-screen min-w-screen">
      <div className="mx-auto py-[10vh] max-w-[500px] max-h-screen">
        <div className="rounded-3xl shadow-2xl">
          <div className="bg-white rounded-2xl p-4">
            <p className="text-center text-4xl font-bold py-10">
              Đăng ký tài khoản
            </p>
            <div className="mx-10">
              <div className="mb-16 grid grid-cols-1 gap-8">
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  className="bg-gray-100 text-l rounded-l p-2"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    validateUserName(e.target.value);
                  }}
                />
                {userNameErrorMsg !== "" ? (
                  <p className="text-red-600">{userNameErrorMsg}</p>
                ) : (
                  <></>
                )}
                <div className="flex">
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="Mật khẩu"
                    className="bg-gray-100 text-l rounded-l p-2 w-full"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
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
                {userPasswordErrorMsg !== "" ? (
                  <p className="text-red-600">{userPasswordErrorMsg}</p>
                ) : (
                  <></>
                )}
                <div className="flex">
                  <input
                    type={showPwd2 ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    className="bg-gray-100 text-l rounded-l p-2 w-full"
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                  {showPwd2 ? (
                    <PreviewOpen
                      theme="outline"
                      size="24"
                      fill="#333"
                      className="my-auto ml-[-32px] cursor-pointer"
                      onClick={toggleShowPwd2}
                    />
                  ) : (
                    <PreviewClose
                      theme="outline"
                      size="24"
                      fill="#333"
                      className="my-auto ml-[-32px] cursor-pointer"
                      onClick={toggleShowPwd2}
                    />
                  )}
                </div>
                {retypeWrong && (
                  <p className="text-red-600">Mật khẩu chưa trùng khớp</p>
                )}
                <button onClick={register} className="w-full mx-auto block bg-black text-white rounded-l shadow-3xl px-4 py-2 text-xl hover:bg-gray-800">
                  Đăng ký
                </button>
                <p className="text-center italic text-gray-400">
                  Bạn đã có tài khoản?{" "}
                  <a href="/login" className="text-black">
                    Đăng nhập
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
