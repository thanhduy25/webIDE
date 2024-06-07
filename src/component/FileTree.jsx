import React, { useState, useRef, useEffect } from "react";
import TreeItem from "./TreeItem";
import { useDispatch } from "react-redux";
import { openContextMenu } from "../store/contextMenuSlice";
import { changeFileTarget } from "../store/treeSlice";

const FileTree = ({ data }) => {
  const dispatch = useDispatch();
  const [isResizing, setIsResizing] = useState(false);
  const [initialWidth, setInitialWidth] = useState(null);
  const [treeWidth, setTreeWidth] = useState("170px");
  const [treeHeight] = useState("100vh");

  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    setInitialWidth(containerRef.current.clientWidth - e.clientX);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isResizing) {
      const newWidth = initialWidth + e.clientX;
      setTreeWidth(newWidth + "px");
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsResizing(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", height: treeHeight }}
      onContextMenu={(event) => {
        event.preventDefault();
        dispatch(openContextMenu({ xPos: event.clientX, yPos: event.clientY }));
        dispatch(changeFileTarget("root"));
      }}
    >
      <div
        style={{
          height: treeHeight,
          width: treeWidth,
          transition: "width 0.001s",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
          overflowX: "hidden",
        }}
        onDoubleClick={(event) => event.preventDefault()}
      >
        <div
          style={{
            position: "absolute",
            width: "10px",
            height: "100%",
            right: "0",
            top: "0",
            cursor: "col-resize",
          }}
          onMouseDown={handleMouseDown}
        ></div>
        {data.map((item, index) => (
          <TreeItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FileTree;
