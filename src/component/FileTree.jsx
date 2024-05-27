// src/FileTree.js
import React from 'react';
import TreeItem from './TreeItem';

const FileTree = ({ data, onFileSelect }) => {
  return (
    <div>
      {data.map((item, index) => (
        <TreeItem sx={{margin:'10px'}}  key={index} item={item} onFileSelect={onFileSelect} />
      ))}
    </div>
  );
};

export default FileTree;
