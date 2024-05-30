import React, { useState, useRef } from 'react';
import TreeItem from './TreeItem';

const FileTree = ({ data, onFileSelect}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [initialWidth, setInitialWidth] = useState(null);
  const [treeWidth, setTreeWidth] = useState("170px");
  const [treeHeight] = useState("100vh");

  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setInitialWidth(containerRef.current.clientWidth - e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = initialWidth + e.clientX;
      setTreeWidth(newWidth + "px");
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div ref={containerRef} style={{ position: "relative", height: treeHeight}}>
      <div style={{height:treeHeight, width: treeWidth, transition: "width 0.001s", borderRight: "1px solid #ddd", overflowY:"auto" }}>
        <div style={{ position: "absolute", width: "10px", height: "100%", right: "0", top: "0", cursor: "col-resize" }} onMouseDown={handleMouseDown}></div>
        {data.map((item, index) => (
          <TreeItem key={index} item={item} onFileSelect={onFileSelect} />
        ))}
      </div>
    </div>
  );
};

export default FileTree;
