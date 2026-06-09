"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticleBody({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none font-malayalam text-ml-base text-text-primary leading-relaxed
      prose-headings:font-malayalam prose-headings:text-text-primary
      prose-h2:text-ml-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
      prose-h3:text-ml-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3
      prose-p:mb-5 prose-p:leading-relaxed
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-strong:text-text-primary prose-strong:font-bold
      prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
      prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-light-blue prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
      prose-code:bg-gray-light prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
      prose-pre:bg-gray-dark prose-pre:rounded-xl prose-pre:p-5
      prose-img:rounded-xl prose-img:w-full">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
