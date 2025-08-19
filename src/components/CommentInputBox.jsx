import { useContext, useRef } from "react";
import { CommentContext } from "./CommentContext";

export default function CommentInputBox({ role, commentId, toggleReplyBox }) {
  const {
    comments: { currentUser, comments: allComments },
    handleCommentUpdate,
  } = useContext(CommentContext);
  const textAreaRef = useRef();

  function handleChange() {
    const el = textAreaRef.current;
    el.style.height = "auto"; // reset
    el.style.height = `${el.scrollHeight}px`; // adjust to content
  }

  function replyComment() {
    return allComments.map((comment) => {
      if (comment.id === commentId) {
        const newReply = {
          id: Date.now().toString() + Math.floor(Math.random() * 1000),
          content: textAreaRef.current.value.trim(),
          createdAt: new Date().toLocaleDateString("en-GB"), // dd/mm/yyyy
          score: 0,
          replyingTo: comment.user.username,
          user: currentUser,
        };
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }

      const targetReply = comment.replies.find((r) => r.id === commentId);
      if (targetReply) {
        const newReply = {
          id: Date.now().toString() + Math.floor(Math.random() * 1000),
          content: textAreaRef.current.value.trim(),
          createdAt: new Date().toLocaleDateString("en-GB"),
          score: 0,
          replyingTo: targetReply.user.username,
          user: currentUser,
        };
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }

      return comment;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (role && role === "reply") {
      const updatedComments = replyComment();
      const newComments = { currentUser, comments: updatedComments };
      handleCommentUpdate(newComments);
      textAreaRef.current.value = "";
      toggleReplyBox();
      return;
    }

    const comment = textAreaRef.current.value.trim();
    const commentId = Date.now().toString() + Math.floor(Math.random() * 1000);
    if (comment) {
      const newComment = {
        id: commentId,
        content: comment,
        createdAt: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        score: 0,
        user: currentUser,
        replies: [],
      };
      allComments.push(newComment);
      const newComments = { currentUser, comments: allComments };
      handleCommentUpdate(newComments);
      textAreaRef.current.value = "";
    }
  }
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
        <div className="col-span-12 md:col-span-9 order-1 md:order-2">
          <textarea
            ref={textAreaRef}
            onChange={handleChange}
            placeholder="Add a comment..."
            className="border border-slate-200 w-full p-2 rounded-[8px] focus:outline-none focus:border-slate-600 overflow-hidden resize-none min-h-[80px] md:min-h-[100px] text-[14px] md:text-[18px]"
          />
        </div>
        <div className="col-span-4 md:col-span-2 order-3 md:order-3">
          <button
            className="py-2 md:py-3 cursor-pointer hover:bg-purple-400 w-full flex justify-center rounded-[8px] bg-purple-600 text-white text-[12px] md:text-[16px] font-semibold uppercase"
            onClick={handleSubmit}
          >
            {role && role === "reply" ? "reply" : "send"}
          </button>
        </div>
      </div>
    </div>
  );
}
