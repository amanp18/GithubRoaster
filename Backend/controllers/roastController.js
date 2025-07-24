import { generateRoast } from "../service/geminiService.js";
import { fetchuser } from "../service/githubService.js";

export const roastcontroller = async (req, res) => {
  try {
    const { username, lang } = req.query;

    if (!username || !lang) {
      return res.status(400).json({ error: "Username and language are required." });
    }

    const profileData = await fetchuser(username, lang);
    const resData = await generateRoast(profileData);

    res.json(resData); // send the roast directly
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Roasting failed." });
  }
};
