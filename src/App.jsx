import { useEffect, useState } from "react";

export default function App() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/template.html")
      .then(res => res.text())
      .then(data => setHtml(data));
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
