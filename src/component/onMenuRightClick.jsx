import { useState, useEffect } from "react";

export default function useMenuRightClick() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setX(e.pageX);
    setY(e.pageY);
    setShowMenu(true);
  };

  const handleClick = () => {
    showMenu && setShowMenu(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [showMenu]); // Thêm showMenu vào dependency array

  return { x, y, showMenu };
}
