import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const limits = {
    Twitter: 280,
    Instagram: 2200,
    Facebook: 63206,
    LinkedIn: 3000,
  };

  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("Twitter");

  const savePost = async () => {
    if (content.length > limits[platform]) {
      alert("Character limit exceeded!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/posts", {
        content,
        platform,
      });

      alert("Post Saved Successfully!");
      console.log(res.data);

      setContent("");
      setPlatform("Twitter");
    } catch (error) {
      console.log(error);
      alert("Error saving post");
    }
  };

  return (
    <div className="container">
      <h1>Social Media Post Composer</h1>

      <textarea
        rows="8"
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <br />
      <br />

      <label>Select Platform:</label>

      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option value="Twitter">Twitter</option>
        <option value="Instagram">Instagram</option>
        <option value="Facebook">Facebook</option>
        <option value="LinkedIn">LinkedIn</option>
      </select>

      <h3>
        Characters: {content.length}/{limits[platform]}
      </h3>

      {content.length > limits[platform] ? (
        <p className="red">❌ Character limit exceeded!</p>
      ) : (
        <p className="green">✅ Valid Post</p>
      )}

      <button onClick={savePost}>Publish Post</button>
    </div>
  );
}

export default App;
