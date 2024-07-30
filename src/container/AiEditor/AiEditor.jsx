import React, { useState } from "react";

import "./AiEditor.css";
import { getPromptAnswer } from "../../utils/model";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

function AiEditor() {
  const [prompt, setPrompt] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [codeString, setCodeString] = useState();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const answer = await getPromptAnswer(prompt);
      setLoading(false);
      console.log(answer);
      const answers = answer.split("```");
      setCodeString(answers[1]);
      console.log("ALL ARRA",answers);

      setAiMessage(answer);
    } catch (e) {
      throw Error(e.message);
    }
  };
  return (
    <div className="overlay">
      <div className="overlay__contnet">
        <h1>Ai Editor</h1>
        {loading ? <p>LOADING</p> : <p>{aiMessage}</p>}
        <form onSubmit={handleSubmitForm}>
          <div className="text__field">
            <input type="text" onChange={(e) => setPrompt(e.target.value)} />
            <input type="submit" />
          </div>

          <SyntaxHighlighter language="javascript" style={dark}>
           {codeString}
          </SyntaxHighlighter>
        </form>
      </div>
    </div>
  );
}

export default AiEditor;
