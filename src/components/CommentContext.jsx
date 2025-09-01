import { createContext, useEffect, useState } from "react";
//import commentData from "../data.json";
import data from "../data";

export const CommentContext = createContext({
  comments: {},
  handleCommentUpdate: () => {},
});

export function CommentProvider({ children }) {
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("comments");
    return saved ? JSON.parse(saved) : data;
  });

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);
  function handleCommentUpdate(newComments) {
    setComments(newComments);
  }
  return (
    <CommentContext.Provider value={{ comments, handleCommentUpdate }}>
      {children}
    </CommentContext.Provider>
  );
}
