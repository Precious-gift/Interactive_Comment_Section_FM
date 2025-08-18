import ReplyIcon from "../assets/images/icon-reply.svg";
export default function ReplyButton({ view }) {
  let styles = "";
  if (view === "desktop") {
    styles =
      "gap-2 hidden md:flex justify-end items-center cursor-pointer w-2/5";
  }
  if (view === "mobile") {
    styles = "gap-2 flex justify-end items-center cursor-pointer";
  }
  return (
    <button className={styles}>
      <div>
        <img src={ReplyIcon} alt="" className="w-fit block" />
      </div>
      <span className="text-purple-600 font-medium text-[20px]">Reply</span>
    </button>
  );
}
