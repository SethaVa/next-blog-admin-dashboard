import React, { useRef, useCallback, useEffect, memo, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

// import tools for editor config
import { EDITOR_JS_TOOLS } from "./tools/tools";

type EditorProps = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
  disabled?: boolean;
};

const Editor: React.FC<EditorProps> = ({ data, onChange, holder }) => {
  const [isMounted, setIsMounted] = useState(false);

  //add a reference to editor
  const ref = useRef<EditorJS>();

  const initializeEditor = async () => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_JS_TOOLS,
        data: data,
        onChange: async () => {
          if (ref && ref.current) {
            // retrieve data inserted
            const savedData = await ref.current.save();
            // save data
            onChange(savedData);
          }
        },
      });

      ref.current = editor;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();

      return () => {
        if (ref.current) {
          ref.current.destroy();
        }
      };
    }
  }, [isMounted]);

  return (
    <div className="items-start justify-start flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-16">
      <article className="prose lg:prose-xl min-w-full">
        <div id={holder}></div>
      </article>
    </div>
  );
};

export default memo(Editor);
