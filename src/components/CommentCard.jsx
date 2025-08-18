import ReplyButton from "./ReplyButton";
import VoteButton from "./VoteButton";
export default function CommentCard({ comment }) {
  const { score, content, createdAt, user, id } = comment;
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <div className="bg-white w-full rounded-[8px] shadow p-4 md:p-8 grid grid-cols-12 gap-4">
        <div className="col-span-6 md:col-span-1 order-2 md:order-1">
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
              <span className="text-slate-600 font-bold text-[5vw] md:text-[20px]">
                {user.username}
              </span>
              <span className="text-slate-400 text-[4vw] md:text-[18px] font-medium">
                {createdAt}
              </span>
            </div>
            <ReplyButton view="desktop" />
          </div>
          <p className="text-slate-400 font-normal text-[5vw] md:text-[20px]">
            {content}
          </p>
        </div>
        <div className="col-span-6 order-3 md:hidden flex justify-end">
          <ReplyButton view="mobile" />
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-1 flex justify-center">
            <div className="bg-slate-200 h-full w-0.5"></div>
          </div>
          <div className="col-span-11 flex flex-col gap-4 justify-center items-center">
            {comment.replies.map((reply) => (
              <CommentCard key={reply.id} comment={reply} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
