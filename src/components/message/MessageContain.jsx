import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";

const MessageContain = () => {
  const { messages } = useSelector((state) => state.message);
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const [loadMore, setLoadMore] = useState(1);
  const messageRef = useRef();
  const loadMoreRef = useRef();

  useEffect(() => {
    messageRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         if (messages && messages?.length > 0 && messages?.length % 9 === 0) {
  //           console.log(messages.length);
  //           console.log(messages?.length % 9);
  //           setLoadMore((p) => p + 1);
  //         }
  //       }
  //     },
  //     { threshold: 0.1 }
  //   );
  //   loadMore === 1 && observer.observe(loadMoreRef.current);
  // }, [messages?.length]);

  // useEffect(() => {
  //   if (loadMore > 1 && currentConversation) {
  //     dispatch(getMoreMessages(currentConversation._id, { _page: loadMore }));
  //   }
  // }, [loadMore, dispatch, currentConversation]);

  return (
    <div className="messages-contain">
      <button
        ref={loadMoreRef}
        style={{ marginTop: "-25px", opacity: 0 }}
      ></button>
      {messages.map((m, index) => (
        <MessageItem
          key={index}
          own={m.sender === user._id}
          ref={messageRef}
          m={m}
        />
      ))}
    </div>
  );
};

export default MessageContain;
