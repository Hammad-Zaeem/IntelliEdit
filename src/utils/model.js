import { GoogleGenerativeAI } from "@google/generative-ai";
import prettier from "prettier";
import babelParser from "prettier/parser-babel";

const genAI = new GoogleGenerativeAI("AIzaSyAoy6kecsJZPGkpXAnmx2UmiDIcev4QaRI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getPromptAnswer(conversationHistory, taskDescription) {
  const prompt = `
Please write efficient, well-documented, and optimized code for the following task:

Task: ${taskDescription}

Requirements:
- Ensure the code is efficient and follows best practices.
- Include comments to explain key parts of the code.
- Provide examples of how to use the implemented code.
- Handle edge cases and input validation.
- Optimize for performance and readability.
- If applicable, suggest improvements or alternatives.
- If you need to explain anything about the program, use comments in the code, don't write explanations other than in the code.
- Take care of previous response if required .....
- Don't give previous response everytime

Conversation history:
${conversationHistory}

New task:
User: ${taskDescription}
AI:
`;

  const generatedCode = await model.generateContent([prompt]);
  console.log(generatedCode);

  // Beautify the generated code using prettier
  // const beautifiedCode = prettier.format(generatedCode.response.text(), {
  //   parser: "babel",
  //   plugins: [babelParser],
  // });
  // return beautifiedCode;
  return generatedCode.response.text();
}
