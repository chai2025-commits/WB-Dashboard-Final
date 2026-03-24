import { useEffect, useState } from "react";

export default function App() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/public/template.html")
      .then(res => res.text())
      .then(data => setHtml(data));
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
