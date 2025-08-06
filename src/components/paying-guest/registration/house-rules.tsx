"use client";
import { useDebounce } from "@/hooks/useDebounce";
// import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { Editor } from "tinymce";

const HouseRules = () => {
  const editorRef = useRef<Editor | null>(null);
  const [houseRules, setHouseRules] = useState<string>("");
  const debouncedHouseRules = useDebounce(houseRules, 500);

  useEffect(() => {
    if (editorRef.current) {
      setHouseRules(editorRef.current.getContent());
    }
  }, []);

  return (
    <div>
      {/* <Editor
        apiKey={APP_CONFIG.EDITOR_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Write your house rules here...</p>"
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={(content) => setHouseRules(content)}
      /> */}
      <button className="mt-4 p-2 bg-blue-500 text-white">Log Content</button>
      <pre>{debouncedHouseRules}</pre>
    </div>
  );
};

export default HouseRules;
