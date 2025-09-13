"use client";

import { forwardRef, type ComponentRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface Props {
    value: string;
    onChange: (val: string) => void;
}

const QuillWrapper = forwardRef<ComponentRef<typeof ReactQuill>, Props>(
    ({ value, onChange }, ref) => {
        const modules = {
            toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
            ],
        };

        return (
            <ReactQuill
                ref={ref}
                theme="snow"
                value={value}
                onChange={onChange}
                className="h-60 mb-12"
                placeholder="Type a content..."
                modules={modules}
            />
        );
    }
);

QuillWrapper.displayName = "QuillWrapper";
export default QuillWrapper;
