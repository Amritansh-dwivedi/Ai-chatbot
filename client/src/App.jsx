import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {

  const [question, setQuestion] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitssss = async (e) => {
    e.preventDefault();
    


    if (!question) return;

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8120/ask", {
        question: question,
      });

      if (res.data._status) {
        setData(res.data.finalData); 
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <h1 className="text-center font-bold text-4xl mb-4">
        Amritansh AI Chat App
      </h1>

      <div className="max-w-[1320px] mx-auto grid grid-cols-[25%_auto] gap-5 p-5">
        <form onSubmit={handleSubmitssss} className="shadow-lg p-4">
          
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 h-[200px] border"
          ></textarea>

          <button
            disabled={loading}
            className="bg-red-500 text-white w-full py-2 mt-2"
          >
            {loading ? "Generating..." : "Create Content"}
          </button>

        </form>

        <div className="border-l border-gray-300">
          <div className="h-[300px] overflow-y-scroll p-3">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ReactMarkdown>{data}</ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;





//use state
//use effect