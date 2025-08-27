import { useContext } from "react";
import { CommentContext } from "./CommentContext";
import InputBox from "./InputBox";

export default function CommentInputBox({ role, commentId, toggleReplyBox }) {
  const {
    comments: { currentUser },
  } = useContext(CommentContext);

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full">
      <div className="bg-white w-full rounded-[8px] shadow p-4 md:p-8 grid grid-cols-12 gap-4">
        <div className="col-span-8 md:col-span-1 order-2 md:order-1 flex md:flex-none items-center md:items-start">
          <div className="flex gap-3 md:gap-4 items-center w-1/6 md:w-full">
            <img
              src={currentUser.image.png}
              alt=""
              className="object-contain w-full"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-11 order-1 md:order-2">
          <InputBox
            role={role}
            toggleReplyBox={toggleReplyBox}
            commentId={commentId}
          />
        </div>
      </div>
    </div>
  );
}
