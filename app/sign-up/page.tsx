
export default function SignUp() {
  return (
    <div className="min-h-screen min-w-screen">
      <div className="mx-auto py-[20vh] max-w-[500px] max-h-screen">
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
                />
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="bg-gray-100 text-l rounded-l p-2 w-full"
                  />
                  <input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    className="bg-gray-100 text-l rounded-l p-2 w-full"
                  />
                <button className="w-full mx-auto block bg-black text-white rounded-l shadow-3xl px-4 py-2 text-xl">
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
