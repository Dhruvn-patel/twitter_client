import { BsTwitterX } from "react-icons/bs";
import React from "react";
import { MdOutlineHome } from "react-icons/md";
import { IoMailOutline, IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import FeedCard from "@/components/FeedCard";

interface sidebarListData {
  title: String;
  icon: React.ReactNode;
}
const listData: sidebarListData[] = [
  {
    title: "Home",
    icon: <MdOutlineHome />,
  },
  {
    title: "Explore  ",
    icon: <IoSearch />,
  },
  {
    title: "Notifications",
    icon: <IoMdNotifications />,
  },
  {
    title: "Messages",
    icon: <IoMailOutline />,
  },
  {
    title: "User",
    icon: <CiUser />,
  },
];

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-3 ml-8   mt-1 pr-4 mr-1">
          <div className="hover:bg-[#393535] h-fit w-fit rounded-full cursor-pointer p-2 transition-all">
            <BsTwitterX className="text-4xl p-1 mx-2 my-1" />
          </div>
          <div className="mt-2 mr-4">
            <ul>
              {listData.map((data, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 hover:bg-[#393535] rounded-full px-4 py-2 w-fit cursor-pointer my-3 justify-start"
                >
                  <span className="text-4xl">{data.icon}</span>
                  <span className="text-lg">{data.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-xl font-medium mr-10">
            <button
              className="bg-[#1C95E6] w-full rounded-full px-4 py-3 
        hover:bg-[#9bc7e0]"
            >
              Post
            </button>
          </div>
        </div>

        <div className="col-span-5 border-slate-800 border-l-[1px] border-r-[1px]">
          <FeedCard />
        </div>
        <div className="col-span-4"></div>
      </div>
    </div>
  );
}
