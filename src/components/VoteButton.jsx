import PlusIcon from "../assets/images/icon-plus.svg";
import MinusIcon from "../assets/images/icon-minus.svg";
import { useContext } from "react";
import { CommentContext } from "./CommentContext";
export default function VoteButton({ role, id }) {
  const { comments, handleCommentUpdate } = useContext(CommentContext);
  let styles = "";
  if (role === "up") {
    styles =
      "py-4 cursor-pointer hover:bg-slate-200 w-full flex justify-center rounded-l-2xl md:rounded-b-none md:rounded-t-2xl border-r border-r-slate-200 md:border-r-0 md:border-b md:border-b-slate-200";
  }
  if (role === "down") {
    styles =
      "py-5 cursor-pointer hover:bg-slate-200 w-full h-full md:h-auto flex justify-center rounded-r-2xl md:rounded-t-none md:rounded-b-2xl border-l border-l-slate-200 md:border-l-0 md:border-t md:border-t-slate-200";
  }

  function updateScore(comments) {
    return comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          score: role === "up" ? comment.score + 1 : comment.score - 1,
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: updateScore(comment.replies),
        };
      }
      return comment;
    });
  }

  function handleVote() {
    let newComments = { ...comments };
    newComments.comments = updateScore(comments.comments);
    handleCommentUpdate(newComments);
  }
  return (
    <>
      <button className={styles} onClick={handleVote}>
        <img src={role === "up" ? PlusIcon : MinusIcon} alt="" />
      </button>
    </>
  );
}
