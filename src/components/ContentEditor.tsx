"use client";

import dynamic from "next/dynamic";

const ContentEditor = dynamic(() => import("./QuillWrapper"), {
  ssr: false,
});

export default ContentEditor;
