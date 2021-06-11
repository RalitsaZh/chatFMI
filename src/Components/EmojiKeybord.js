import React, { useState, useEffect, } from "react";
import EmojiPicker, {SKIN_TONE_MEDIUM_DARK} from "emoji-picker-react";


function EmojiKeybord({ comment, setComment, inputRef }) {

  const [cursorPosition, setCursorPosition] = useState();
 
  const onEmojiClick = (ev, emojiObject) => {
    const ref = inputRef.current;
    ref.focus();
    const start = comment.substring(0, ref.selectionStart);
    const end = comment.substring(ref.selectionStart);
    const text = start + emojiObject.emoji + end;
    setComment(text);
    setCursorPosition(start.length + emojiObject.emoji.length);
  };

  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  return (
    <React.Fragment>
      <EmojiPicker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
    </React.Fragment>
  );
}

export default EmojiKeybord;
