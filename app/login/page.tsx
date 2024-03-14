export default function Login() {
  return (
    <div className="min-h-screen min-w-screen">
      <div className="mx-auto py-[20vh] max-w-[500px] max-h-screen">
        <div className="rounded-3xl shadow-2xl">
          <div className="bg-white rounded-2xl p-4">
            <p className="text-center text-4xl font-bold py-10">
              Đăng nhập
            </p>
            <div className="mx-10">
              <div className="mb-16 grid grid-cols-1 gap-8">
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  className="bg-gray-100 text-l rounded-l p-2"
                />
                <div>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="bg-gray-100 text-l rounded-l p-2 w-full"
                  />
                  <div className="flex gap-2 py-2">
                    <input type="checkbox" className="text-xl" />
                    <p>Ghi nhớ mật khẩu</p>
                  </div>
                </div>
                <button className="w-full mx-auto block bg-black text-white rounded-xl shadow-3xl px-4 py-2 text-xl">
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
