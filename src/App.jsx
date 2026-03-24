import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY
);

export default function App() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/template.html")
      .then(res => res.text())
      .then(data => {
        setHtml(data);

        // Wait for HTML to load, then attach login handler
        setTimeout(() => {
          const form = document.querySelector("form");

          if (form) {
            form.addEventListener("submit", async (e) => {
              e.preventDefault();

              const email = form.querySelector('input[type="email"]').value;
              const password = form.querySelector('input[type="password"]').value;

              const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });

              if (error) {
                alert("Login failed: " + error.message);
              } else {
                alert("Login successful!");
                console.log(data);
              }
            });
          }
        }, 500);
      });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
