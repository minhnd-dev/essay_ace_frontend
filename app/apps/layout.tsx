"use client";
import { WritingFluently, BookOne, User, Logout } from "@icon-park/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NavItem {
  label: string;
  handler: () => void;
  icon: JSX.Element;
}
export default function RootTest({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState({ label: "Luyện viết" });

  const topNavItems: NavItem[] = [
    {
      icon: <WritingFluently theme="outline" size="24" fill="#333" />,
      label: "Luyện viết",
      handler: handleClickWriting,
    },
    {
      icon: <BookOne theme="outline" size="24" fill="#333" />,
      label: "Từ điển",
      handler: handleClickDictionary,
    },
  ];

  const bottomNavItems = [
    {
      icon: <User theme="outline" size="24" fill="#333" />,
      label: "Tài khoản",
      handler: handleClickAccount,
    },
    {
      icon: <Logout theme="outline" size="24" fill="#333" />,
      label: "Đăng xuất",
      handler: handleClickLogout,
    },
  ];

  useEffect(
    ()=>{
      const paths = [
        {
          "label": "Luyện viết",
          "path": "/apps/writing"
        },
        {
          "label": "Từ điển",
          "path": "/apps/dictionary"
        },
        {
          "label": "Tài khoản",
          "path": "/apps/account"
        }
      ]
      for (let i in paths) {
        if (paths[i].path === pathName){
          setCurrentPage({label: paths[i].label})
        }
      }
      
  }, [pathName])
  function handleClickNavItem(item: NavItem) {
    setCurrentPage(item);
    item.handler();
  }

  function handleClickWriting() {
    router.push("/apps/writing");
  }
  function handleClickDictionary() {
    router.push("/apps/dictionary");
  }
  function handleClickAccount() {
    router.push("/apps/account");
  }
  function handleClickLogout() {}

  return (
    <div className="flex">
      <div className="h-screen max-w-[300px] bg-gray-100 flex flex-col justify-between">
        <div>
          <p className="text-2xl font-bold py-8 text-center px-8">
            English Unlocked
          </p>
          <div>
            {topNavItems.map((item, index) => (
              <div
                onClick={() => handleClickNavItem(item)}
                key={index}
                className={`grid grid-cols-4 hover:bg-gray-200 p-4 m-2 rounded-lg cursor-pointer ${
                  currentPage.label === item.label ? "bg-gray-300" : ""
                }`}
              >
                <div className="col-span-1">{item.icon}</div>
                <p className="col-span-3">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          {bottomNavItems.map((item, index) => (
            <div
              onClick={() => handleClickNavItem(item)}
              key={index}
              className={`grid grid-cols-4 hover:bg-gray-200 p-4 m-2 rounded-lg cursor-pointer ${
                currentPage.label === item.label ? "bg-gray-300" : ""
              }`}
            >
              <div className="col-span-1">{item.icon}</div>
              <p className="col-span-3">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
