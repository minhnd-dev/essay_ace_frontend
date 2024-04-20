"use client";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import fetchWithToken from "@/app/utils/api";
export default function Account() {
  return (
    <div className="m-auto max-w-[1000px]">
      <div className="my-8">
        <p className="font-bold text-xl">Đổi mật khẩu</p>
        <ChangePassword />
      </div>
    </div>
  );
}

function ChangePassword() {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [retypeNewPwd, setRetypeNewPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");

  function changePassword() {
    fetchWithToken(
      "http://localhost:5000/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: oldPwd,
          new_password: newPwd,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert("Đổi mật khẩu thành công")
      }
    ).catch((err) => {
      alert("Đã có lỗi xảy ra")
    })
  }

  useEffect(() => {
    if (newPwd.length < 8 || newPwd.length >= 128) {
      setErrorMsg("Mật khẩu cần có độ dài từ 8 - 128 ký tự");
    } else {
      setErrorMsg("");
    }
  }, [newPwd])

  useEffect(() => {
    console.log("Changed");
    
    if (newPwd !== retypeNewPwd){
      setErrorMsg2("Mật khẩu chưa trùng khớp")
    } else {
      setErrorMsg2("")
    }
  }, [retypeNewPwd, newPwd])

  return (
    <div>
      <div className="grid grid-cols-7 gap-4 py-4">
        <input
          type="password"
          placeholder="Mật khẩu cũ"
          className="col-span-2 bg-gray-100 text-l rounded-l p-2 w-full"
          onChange={(e) => setOldPwd(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          className="col-span-2 bg-gray-100 text-l rounded-l p-2 w-full"
          onChange={(e) => setNewPwd(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          className="col-span-2 bg-gray-100 text-l rounded-l p-2 w-full"
          onChange={(e) => setRetypeNewPwd(e.target.value)}
        />
        <Button className="col-span-1" onClick={changePassword}>Lưu</Button>
      </div>
      {errorMsg !== "" && <p className="text-red-600 text-sm">{errorMsg}</p>}
      {errorMsg2 !== "" && <p className="text-red-600 text-sm">{errorMsg2}</p>}
    </div>
  );
}
