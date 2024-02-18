import Image from "next/image";
import React from "react";
import { BiMessageRounded, BiRepost } from "react-icons/bi";
import { CiBookmark, CiHeart } from "react-icons/ci";
const FeedCard = () => {
  return (
    <div>
      <div className="grid grid-cols-12 border border-slate-800 border-l-0 border-r-0 p-2">
        <div className="col-span-1 mb-2 mt-1 ml-1">
          <Image
            className="text-4xl"
            src="https://avatars.githubusercontent.com/u/87563885?v=4"
            alt="user-avatar"
            height={50}
            width={50}
          />
        </div>
        <div className="col-span-11 ml-3">
          <h4 className="font-bold">Dhruv patel</h4>
          <p className="mt-1">
            - India beat Bangladesh by 84 runs. - India beat Ireland by 201
            runs. - India beat USA by 201 runs. - India beat New Zealand by 214
            runs. - India beat Nepal by 132 runs. India U-19 qualified into the
            Semis without losing a single match in U-19 World Cup - total
            dominance 🤯🇮🇳
          </p>
          <div className="my-3 text-xl flex w-[80%]  gap-3 justify-between">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <BiRepost />
            </div>
            <div>
              <CiHeart />
            </div>
            <div>
              <CiBookmark />
            </div>  
          </div>  
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
