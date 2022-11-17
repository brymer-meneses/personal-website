import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import metadataParser from "markdown-yaml-metadata-parser";

import "../styles/BlogPreview.scss";

interface props {
  filename: string;
}

interface BlogAttribute {
  created: string;
  tags: string;
  title: string;
}

function BlogPreview(props: props) {
  const navigate = useNavigate();
  const [attributes, setAttributes] = useState<BlogAttribute>({
    created: "",
    tags: "",
    title: "",
  });

  useEffect(() => {
    import(`../posts/${props.filename}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setAttributes(metadataParser(res).metadata))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  return (
    <div
      className="blog-preview-item"
      onClick={() => navigate(`/blog/${props.filename}`)}
    >
      <h2>{attributes.title}</h2>
      <p>{attributes.created}</p>
      <div className="blog-preview-item__tags">
        {attributes.tags.split(",").map((tag, i) => {
          return <p key={i}>#{tag.trim()}</p>;
        })}
      </div>
    </div>
  );
}

export default BlogPreview;
