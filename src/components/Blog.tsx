import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import rehypeKatex from "rehype-katex";
// import rehypeStringify from 'rehype-stringify';
import "katex/dist/katex.min.css";

// @ts-ignore
import metadataParser from "markdown-yaml-metadata-parser";

import "../styles/Blog.scss";

import CodeBlock from "./CodeBlock";

interface BlogAttribute {
  created: string;
  tags: string;
  title: string;
}

function Blog() {
  const { title } = useParams();
  const [content, setContent] = useState("");
  const [attributes, setAttributes] = useState<BlogAttribute>({
    created: "",
    tags: "",
    title: "",
  });

  useEffect(() => {
    import(`../posts/${title}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => metadataParser(res))
          .then((res) => {
            setAttributes(res.metadata);
            setContent(res.content);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  return (
    <section className="blog-page-container">
      <div className="blog-page-container__info">
        <h1>{attributes.title}</h1>
        <h2>{attributes.created}</h2>
        <ul className="blog-page-item__tags">
          {attributes.tags.split(",").map((tag, i) => {
            return <li key={i}>#{tag.trim()}</li>;
          })}
        </ul>
        <hr />
      </div>
      <ReactMarkdown
        children={content}
        rehypePlugins={[rehypeKatex]}
        remarkPlugins={[remarkMath, remarkGfm]}
        components={{ code: CodeBlock }}
      />
    </section>
  );
}

export default Blog;
