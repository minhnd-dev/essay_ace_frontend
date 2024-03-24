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
      <div>The main page is here</div>
    </div>
  );
}
