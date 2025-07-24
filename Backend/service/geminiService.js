import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const geminiApi = process.env.GEMINI_API_KEY;
const apiurl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const generateRoast = async (prompt) => {
  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const res = await axios.post(`${apiurl}?key=${geminiApi}`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseText = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return responseText || "Roast failed to generate.";
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return "Error generating roast.";
  }
};
