import { BsTwitterX } from "react-icons/bs";
import React, { useCallback } from "react";
import { MdOutlineHome, MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { IoMailOutline, IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { connect } from "tls";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks";
import { QueryClient } from "@tanstack/react-query";
import Image from "next/image";
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

const queryClient = new QueryClient();
export default function Home() {
  const { user } = useCurrentUser();
  const handleGoogleAuth = useCallback(
    async (cred: CredentialResponse) => {
      //create query from graphql and store token to localstorage
      const googleToken = cred.credential;
      if (!googleToken) toast.error("Google Token not found");
      try {
        const { verfiyGoogleToken } = await graphQLClient.request(
          verifyUserGoogleTokenQuery,
          {
            token: googleToken,
          }
        );
        if (verfiyGoogleToken) {
          window.localStorage.setItem("twitter_token", verfiyGoogleToken);
        }

        toast.success("Successfully verify.");
      } catch (error) {
        console.log("error", error);
      }

      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    [queryClient]
  );

  const handleSelectImages = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="relative col-span-3 ml-8   mt-1 pr-4 mr-1">
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

          {user && (
            <div className="absolute bottom-7  items-center flex gap-3 py-2 px-3 rounded-full bg-slate-800 ">
              <Image
                className="rounded-full"
                src={user?.profileImg}
                alt="user-img"
                height={50}
                width={50}
              />
              <h4>
                {user.firstName} {user.lastName}
              </h4>
            </div>
          )}
        </div>

        <div className="col-span-5 border-slate-800 border-l-[1px] border-r-[1px]">
          <div className="grid grid-cols-12 border border-slate-800 border-l-0 border-r-0 p-2">
            <div className="col-span-1 mb-2 mt-1 ml-1">
              {user && (
                <Image
                  className="text-4xl rounded-full"
                  src={user?.profileImg}
                  alt="user-avatar"
                  height={50}
                  width={50}
                />
              )}
            </div>
            <div className="col-span-11 mt-2 mx-3 ">
              <textarea
                className="w-full bg-transparent p-3"
                rows={4}
                placeholder="What's happenings ?"
              ></textarea>
              <div className="flex justify-between items-center my-3">
                <MdOutlinePhotoSizeSelectActual size={20} 
                className="cursor-pointer"
                 onClick={handleSelectImages}
                />
                <button
                  className="bg-[#1C95E6]  rounded-full px-4 py-1
        hover:bg-[#9bc7e0]"
                 
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          <FeedCard />
        </div>
        {!user && (
          <div className="col-span-3 pl-4">
            <div className="p-4 bg-slate-800 flex flex-col justify-center items-center  rounded-lg mt-4">
              <span className="text-2xl">New to twitter ?</span>
              <div>
                <GoogleLogin onSuccess={handleGoogleAuth} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
