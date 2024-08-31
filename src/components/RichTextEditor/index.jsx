// components/RichTextEditor.js

import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./textEditor.module.css";

export default function RichTextEditor({ value, onChange }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Indicates that the component is now running on the client side
  }, []);

  if (!isClient) {
    return null; // Return nothing on the server side to avoid SSR issues
  }

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      className={styles.customTextEditor}
      modules={{
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
      ]}
      placeholder="Write something..."
    />
  );
}
