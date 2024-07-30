import { GoogleGenerativeAI } from "@google/generative-ai";
import prettier from "prettier";
import babelParser from "prettier/parser-babel";



const genAI = new GoogleGenerativeAI("AIzaSyAoy6kecsJZPGkpXAnmx2UmiDIcev4QaRI");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



export async function getPromptAnswer(prompt) {
  const generatedCode = await model.generateContent([prompt]);

  console.log(generatedCode)
  // Beautify the generated code using prettier
//   const beautifiedCode = prettier.format(generatedCode.response.text(), {
//     parser: "babel",
//     plugins: [babelParser]
//   });
  return generatedCode.response.text();
}
