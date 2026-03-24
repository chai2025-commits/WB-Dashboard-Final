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

        // Define global login function
        window.doLogin = async function () {
          const email = document.querySelector('input[type="email"]')?.value;
          const password = document.querySelector('input[type="password"]')?.value;

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
        };
      });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
