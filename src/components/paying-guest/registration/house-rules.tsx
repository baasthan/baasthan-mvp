"use client";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config";
import useSaveHouseRules from "@/hooks/client-hooks/useSaveHouseRules";
import { useDebounce } from "@/hooks/useDebounce";

// import { Editor } from "@tinymce/tinymce-react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Editor as TinyMCEEditorType } from "tinymce";

interface HouseRulesProps {
  id: string;
}

const TinyMCEEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);
const HouseRules = ({ id }: HouseRulesProps) => {
  const editorRef = useRef<TinyMCEEditorType | null>(null);
  const [houseRules, setHouseRules] = useState<string>("");
  const debouncedHouseRules = useDebounce(houseRules, 500);
  const {
    data: response,
    error,
    execute,
    isLoading,
    isSuccess,
  } = useSaveHouseRules();

  useEffect(() => {
    if (editorRef.current) {
      setHouseRules(editorRef.current.getContent());
    }
  }, []);

  useEffect(() => {
    if (isSuccess !== null) {
      if (isSuccess) {
        toast.success(response && "House Rules Created Successfully");
        redirect("/");
      } else {
        toast.error(error);
        console.error(error);
      }
    }
  }, [isSuccess]);

  return (
    <div className=" flex flex-col gap-4">
      <TinyMCEEditor
        apiKey={APP_CONFIG.EDITOR_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],

          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",

          style_formats: [
            { title: "Heading 1", format: "h1" },
            { title: "Heading 2", format: "h2" },
            { title: "Heading 3", format: "h3" },
            { title: "Paragraph", format: "p" },
          ],
          placeholder: "Enter House Rules",
        }}
        onEditorChange={(content) => setHouseRules(content)}
      />
      <div className=" flex flex-row justify-end">
        <Button
          onClick={() => {
            if (editorRef.current) {
              console.log(editorRef.current.getContent());
              execute(id, editorRef.current.getContent());
            }
          }}
        >
          Save House Rules
        </Button>
      </div>

      <div
        className="prose shadow-2xl rounded-2xl min-h-52 p-2 min-w-full outline"
        dangerouslySetInnerHTML={{ __html: debouncedHouseRules }}
      />
    </div>
  );
};

export default HouseRules;
