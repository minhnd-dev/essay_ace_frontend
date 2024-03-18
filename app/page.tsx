"use client";

import { User, WritingFluently, BookOne, Logout } from "@icon-park/react";
export default function Home() {
  const topNavItems = [
    {
      icon: <WritingFluently theme="outline" size="24" fill="#333" />,
      label: "Luyện viết",
    },
    {
      icon: <BookOne theme="outline" size="24" fill="#333" />,
      label: "Từ điển",
    },
  ];

  const bottomNavItems = [
    {
      icon: <User theme="outline" size="24" fill="#333" />,
      label: "Tài khoản",
    },
    {
      icon: <Logout theme="outline" size="24" fill="#333" />,
      label: "Đăng xuất",
    },
  ];

  return (
    <div className="flex">
      <div className="h-screen max-w-[300px] bg-gray-100 flex flex-col justify-between">
        <div>
          <p className="text-2xl font-bold py-8 text-center px-8">
            English Unlocked
          </p>
          <div>
            {topNavItems.map((item, index) => (
              <div key={index} className="grid grid-cols-4 hover:bg-gray-200 p-4 m-2 rounded-lg cursor-pointer">
                <div className="col-span-1">{item.icon}</div>
                <p className="col-span-3">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          {bottomNavItems.map((item, index) => (
            <div key={index} className="grid grid-cols-4 hover:bg-gray-200 p-4 m-2 rounded-lg cursor-pointer">
              <div className="col-span-1">{item.icon}</div>
              <p className="col-span-3">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div>The main page is here</div>
    </div>
  );
}
