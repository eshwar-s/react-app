import { cloneElement, useRef, useState } from "react";

function Editable({ element, placeholder, onChanged }) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef(null);

  const handleLostFocus = () => {
    if (ref.current.innerText !== "") {
      onChanged(ref.current.innerText);
    } else {
      onChanged(placeholder);
      ref.current.innerText = placeholder;
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      handleLostFocus();
    }
  };

  return cloneElement(element, {
    ref: ref,
    contentEditable: isEditing ? "plaintext-only" : "false",
    suppressContentEditableWarning: true,
    spellCheck: false,
    noWrap: !isEditing && element.props.noWrap,
    onKeyDown: handleKeyDown,
    onClick: () => setIsEditing(true),
    onBlur: handleLostFocus,
  });
}

export default Editable;
