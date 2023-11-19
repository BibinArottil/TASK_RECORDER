import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichTextEditor({ onEditorChange }) {
  const handleChange = (value) => {
    onEditorChange(value);
  };
  return (
    <>
      <ReactQuill onChange={handleChange} />
    </>
  );
}
