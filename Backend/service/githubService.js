import axios from "axios";

export const fetchuser = async (username, lang = "en") => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  const { login, bio, public_repos, followers, following, location } = response.data;

  if (lang === "hi") {
    return `
    नीचे दिए गए GitHub यूज़र की जानकारी के आधार पर इस बंदे का हिंदी में मज़ाक उड़ाओ।
    मजाक मज़ेदार, ताना मारने वाला और थोड़ा शैतानी वाला हो:

    नाम: ${login}
    बायो: ${bio || "बायो नहीं है, बस हवा में उड़ रहा है"}
    रेपो: ${public_repos}
    फॉलोअर्स: ${followers}
    फॉलोइंग: ${following}
    लोकेशन: ${location || "लोकेशन नहीं, लगता है रास्ता भटक गया है"}

  "उन्हें ऐसे roast करो जैसे वो एक बेकार, गुमराह और बेमतलब इंसान हों — जैसे उनका पैदा होना ब्रह्मांड की एक थकी हुई गलती हो। roast इतना बेधड़क, दिमाग़ चीर देने वाला और चालाक होना चाहिए कि पहले वो गुस्से से फट जाएं और फिर अंदर ही अंदर अपनी औकात पर शक करने लगें। उनकी नकली अकड़, खोखली बुद्धि और बेमकसद ज़िंदगी को निशाना बनाओ — 100 शब्दों के अंदर। गालियों की ज़रूरत नहीं, सिर्फ ठंडी, शातिर निराशा जैसे Lucifer बोल रहा हो: ‘तू है क्यों अब तक? (use simple words)`;
  } else {
    return `
    Roast this GitHub user brutally:
    Name: ${login}
    Bio: ${bio || "No bio, just vibes"}
    Repos: ${public_repos}
    Followers: ${followers}
    Following: ${following}
    Location: ${location || "Probably lost"}

    Roast them like they are useless, delusional nobody. Make it brutally honest, soul-crushing, and smart — enough to make them angry at first, then silently question their worth. Target their intelligence, their fake confidence, and their existence in under 100 words. No profanity. Sarcastic and cold, like you're tired of their presence- go hard use abusive (use simple words)`;
  }
};
