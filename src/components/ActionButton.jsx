export default function ActionButton({
  view,
  onClick,
  action,
  icon,
  textClasses,
}) {
  let styles = "";
  if (view === "desktop") {
    styles =
      "gap-2 hidden md:flex items-center cursor-pointer hover:opacity-50";
  }
  if (view === "mobile") {
    styles =
      "gap-2 flex justify-end items-center cursor-pointer hover:opacity-50";
  }
  return (
    <button className={styles} onClick={onClick}>
      <div>
        <img src={icon} alt="" className="w-fit block" />
      </div>
      <span className={`font-medium capitalize ${textClasses}`}>{action}</span>
    </button>
  );
}
