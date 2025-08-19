import { useContext } from "react";
import CommentCard from "./components/CommentCard";
import { CommentContext } from "./components/CommentContext";
import CommentInputBox from "./components/CommentInputBox";

function App() {
  const { comments } = useContext(CommentContext);
  return (
    <div className="rubik-font min-h-screen p-6 md:p-24 flex flex-col gap-6 justify-center items-center w-full md:w-3/5 ml-auto mr-auto">
      {comments.comments.map((comment) => (
        <CommentCard
          key={`${
            Date.now().toString() +
            Math.floor(Math.random() * 1000) +
            comment.id
          }`}
          comment={comment}
        />
      ))}
      <CommentInputBox />
    </div>
  );
}

export default App;
