import { useContext, useEffect, useRef } from "react";
import { CommentContext } from "./CommentContext";

export default function InputBox({ role, commentId, toggleReplyBox }) {
  const {
    comments: { currentUser, comments: allComments },
    handleCommentUpdate,
  } = useContext(CommentContext);
  const textAreaRef = useRef();

  useEffect(() => {
    if (role && role === "edit") {
      const comment = allComments.find((c) => c.id === commentId);
      if (comment) {
        textAreaRef.current.value = comment.content;
        handleChange();
      }
      if (!comment) {
        allComments.map((comment) => {
          const targetReply = comment.replies.find((r) => r.id === commentId);
          if (targetReply) {
            textAreaRef.current.value = targetReply.content;
            handleChange();
          }
        });
      }
    }
  }, [allComments, commentId, role]);

  function handleChange() {
    const el = textAreaRef.current;
    el.style.height = "auto"; // reset
    el.style.height = `${el.scrollHeight}px`; // adjust to content
  }

  function editComment() {
    return allComments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content: textAreaRef.current.value.trim(),
        };
      }

      const targetReply = comment.replies.find((r) => r.id === commentId);
      if (targetReply) {
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === commentId
              ? { ...reply, content: textAreaRef.current.value.trim() }
              : reply
          ),
        };
      }

      return comment;
    });
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

    if (role && role === "edit") {
      const updatedComments = editComment();
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
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-10 order-1 md:order-2">
        <textarea
          ref={textAreaRef}
          onChange={handleChange}
          placeholder="Add a comment..."
          className="border border-slate-200 w-full p-2 rounded-[8px] focus:outline-none focus:border-slate-600 overflow-hidden resize-none min-h-[80px] md:min-h-[100px] text-[14px] md:text-[18px]"
        />
      </div>
      <div className="col-span-12 md:col-span-2 order-2 md:order-3 flex md:flex-none justify-end">
        <button
          className="py-2 md:py-3 cursor-pointer hover:bg-purple-400 w-2/6 md:w-full h-fit flex justify-center rounded-[8px] bg-purple-600 text-white text-[12px] md:text-[16px] font-semibold uppercase"
          onClick={handleSubmit}
        >
          {role && role === "reply"
            ? "reply"
            : role === "edit"
            ? "update"
            : "send"}
        </button>
      </div>
    </div>
  );
}
