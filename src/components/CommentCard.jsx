import { useContext, useState, useCallback, useRef } from "react";
import VoteButton from "./VoteButton";
import CommentInputBox from "./CommentInputBox";
import InputBox from "./InputBox";
import ActionButton from "./ActionButton";
import ReplyIcon from "../assets/images/icon-reply.svg";
import EditIcon from "../assets/images/icon-edit.svg";
import DeleteIcon from "../assets/images/icon-delete.svg";
import { CommentContext } from "./CommentContext";
import Modal from "./Modal";
export default function CommentCard({ comment, role }) {
  const {
    comments: { currentUser, comments: allComments },
    handleCommentUpdate,
  } = useContext(CommentContext);
  const [replyBoxVisible, setReplyBoxVisible] = useState(false);
  const [editBoxVisible, setEditBoxVisible] = useState(false);
  const modalRef = useRef();
  const { score, content, createdAt, user, id } = comment;

  function toggleReplyBox() {
    setReplyBoxVisible(!replyBoxVisible);
  }

  function toggleEditBox() {
    setEditBoxVisible(!editBoxVisible);
  }

  const deleteComment = useCallback(() => {
    modalRef.current.showModal();
  }, []);

  const handleCommentDelete = useCallback(() => {
    const commentToDelete = allComments.find((r) => r.id === id);
    let updatedComments;
    if (commentToDelete) {
      updatedComments = allComments.filter((r) => r.id !== id);
    }

    if (!commentToDelete) {
      updatedComments = allComments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== id),
        };
      });
    }
    const newComments = { currentUser, comments: updatedComments };
    handleCommentUpdate(newComments);
  }, [allComments, currentUser, handleCommentUpdate, id]);

  return (
    <>
      <Modal ref={modalRef} onConfirm={handleCommentDelete} />
      <div className="flex flex-col gap-5 justify-center items-center md:w-full">
        <div className="bg-white w-full rounded-[8px] shadow p-4 md:p-8 grid grid-cols-12 gap-4">
          <div className="col-span-5 md:col-span-1 order-2 md:order-1">
            <div className="bg-slate-50 shadow rounded-2xl flex flex-row md:flex-col justify-center items-center">
              <VoteButton
                role="up"
                id={id}
                replies={comment.replies ? comment.replies : []}
              />
              <span className="px-2 md:px-0 md:py-4 text-purple-600 font-medium text-2xl">
                {score}
              </span>
              <VoteButton
                role="down"
                id={id}
                replies={comment.replies ? comment.replies : []}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-11 order-1 md:order-2">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3 md:gap-4 items-center w-full md:w-3/5">
                <img
                  src={user.image.png}
                  alt=""
                  className="object-contain w-1/6 md:w-1/12"
                />
                <span className="text-slate-600 font-bold text-[4vw] md:text-[20px]">
                  {user.username}
                </span>
                <span className="text-slate-400 text-[4vw] md:text-[18px] font-medium">
                  {createdAt}
                </span>
              </div>
              {currentUser.username === user.username && (
                <div className="flex gap-4">
                  <ActionButton
                    view="desktop"
                    onClick={deleteComment}
                    action={"delete"}
                    icon={DeleteIcon}
                    textClasses="text-pink-400"
                  />
                  <ActionButton
                    view="desktop"
                    onClick={toggleEditBox}
                    action={"edit"}
                    icon={EditIcon}
                    textClasses="text-slate-600"
                  />
                </div>
              )}
              {currentUser.username != user.username && (
                <ActionButton
                  view="desktop"
                  onClick={toggleReplyBox}
                  action={"reply"}
                  icon={ReplyIcon}
                  textClasses="text-purple-600"
                />
              )}
            </div>
            {!editBoxVisible && (
              <p className="text-slate-400 font-normal text-[5vw] md:text-[20px] break-all">
                {role && role === "reply" && (
                  <span className="text-purple-600">
                    @{comment.replyingTo}{" "}
                  </span>
                )}
                {content}
              </p>
            )}
            {editBoxVisible && (
              <InputBox
                role={"edit"}
                toggleReplyBox={toggleEditBox}
                commentId={id}
              />
            )}
          </div>
          <div className="col-span-7 order-3 md:hidden flex justify-end">
            {currentUser.username === user.username && (
              <div className="flex gap-4">
                <ActionButton
                  view="mobile"
                  onClick={deleteComment}
                  action={"delete"}
                  icon={DeleteIcon}
                  textClasses="text-pink-400 text-[14px]"
                />
                <ActionButton
                  view="mobile"
                  onClick={toggleEditBox}
                  action={"edit"}
                  icon={EditIcon}
                  textClasses="text-slate-600 text-[14px]"
                />
              </div>
            )}
            {currentUser.username != user.username && (
              <ActionButton
                view="mobile"
                onClick={toggleReplyBox}
                action={"reply"}
                icon={ReplyIcon}
                textClasses="text-purple-600"
              />
            )}
          </div>
        </div>
        {replyBoxVisible && (
          <CommentInputBox
            role="reply"
            commentId={id}
            toggleReplyBox={toggleReplyBox}
          />
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="grid grid-cols-12 w-full">
            <div className="col-span-1 flex justify-center">
              <div className="bg-slate-200 h-full w-0.5"></div>
            </div>
            <div className="col-span-11 flex flex-col gap-4 justify-center items-center">
              {comment.replies.map((reply) => (
                <CommentCard
                  key={`${reply.id}${
                    Date.now().toString() + Math.floor(Math.random() * 1000)
                  }`}
                  comment={reply}
                  role={"reply"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
