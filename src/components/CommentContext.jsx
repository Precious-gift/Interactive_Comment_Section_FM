import { createContext, useState } from "react";
import commentData from "../data.json";

export const CommentContext = createContext({
  comments: {},
  handleCommentUpdate: () => {},
});

export function CommentProvider({ children }) {
  const [comments, setComments] = useState(commentData);
  function handleCommentUpdate(comments) {
    setComments(comments);
  }
  return (
    <CommentContext.Provider value={{ comments, handleCommentUpdate }}>
      {children}
    </CommentContext.Provider>
  );
}
