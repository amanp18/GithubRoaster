import React, { useState, useEffect } from "react";

// 🪧 Flying velvet banner
const VelvetBanner = () => (
  <div
    className="absolute top-0 w-full h-24 bg-gradient-to-r from-red-800 to-red-600 flex items-center justify-center rounded-b-full shadow-2xl z-20 animate-pulse"
  >
    <p className="text-white font-bold text-xl md:text-2xl tracking-wide">
      🔥 Roast Developers • Be Savage • Stay Funny 🔥
    </p>
  </div>
);

// ✨ Floating header
const FloatingTitle = () => (
  <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-xl text-center animate-bounce">
    🚀 GitHub Roaster
  </h1>
);

// 🧊 3D-style cubes and spheres (CSS only)
const CornerObject = ({ type = "box", position, color }) => (
  <div
    className={`absolute w-12 h-12 ${type === "box" ? "rounded-lg" : "rounded-full"} shadow-lg animate-pulse`}
    style={{
      backgroundColor: color,
      left: position[0],
      top: position[1],
      transform: "rotateX(15deg) rotateY(15deg)",
      animation: `float 4s ease-in-out infinite ${Math.random() * 2}s`,
    }}
  />
);

export default function App() {
  const [username, setUsername] = useState("");
  const [lang, setLang] = useState("en");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setRoast("");
    setError("");
  }, [lang, username]);

  const handleRoast = async () => {
    if (!username) {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    setError("");
    setRoast("");

    try {
      const response = await fetch(`https://githubroaster.onrender.com/api/roast?username=${username}&lang=${lang}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      // console.log("🌐 Roast Response:", data);
//  console.log(data.resData)
      if (data || data.resData) {
        setRoast(data);
      } else {
        setError("No roast data received.");
      }
    } catch (err) {
      console.error("❌ Error fetching roast:", err);
      setError("Error fetching roast. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRoast();
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(15deg) rotateY(15deg); }
          50% { transform: translateY(-15px) rotateX(20deg) rotateY(20deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
      
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <VelvetBanner />

        {/* 3D-style floating objects */}
        <CornerObject type="box" position={["10%", "20%"]} color="#00f2ff" />
        <CornerObject type="sphere" position={["85%", "25%"]} color="#ffdd00" />
        <CornerObject type="box" position={["5%", "75%"]} color="#ff69b4" />
        <CornerObject type="sphere" position={["90%", "70%"]} color="lime" />
        <CornerObject type="box" position={["15%", "45%"]} color="#ff6b6b" />
        <CornerObject type="sphere" position={["80%", "50%"]} color="#4ecdc4" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
          <FloatingTitle />

          <div className="mt-10 bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-8 w-full max-w-2xl text-white relative overflow-hidden">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 shimmer opacity-20 pointer-events-none rounded-3xl"></div>
            
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center relative z-10 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              🧠 Roast Machine 3000
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 relative z-10">
              <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 rounded-lg text-black w-full shadow-inner border-2 border-transparent focus:border-pink-400 transition-all duration-300 focus:scale-105"
              />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="px-3 py-3 rounded-lg bg-white text-black shadow-inner border-2 border-transparent focus:border-pink-400 transition-all duration-300"
              >
                <option value="en">🇺🇸 English</option>
                <option value="hi">🇮🇳 Hindi</option>
              </select>
              <button
                onClick={handleRoast}
                disabled={loading}
                className="px-5 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? "🔥 Roasting..." : "🔥 Roast Me"}
              </button>
            </div>

            {error && (
              <div className="text-red-400 font-semibold text-center mb-2 p-3 bg-red-900/20 rounded-lg border border-red-500/30 relative z-10">
                {error}
              </div>
            )}

            {roast && (
              <div
                className="mt-4 bg-black/30 border border-white/20 p-5 rounded-xl text-lg font-medium min-h-[60px] relative z-10 transform transition-all duration-500 hover:scale-[1.02]"
                style={{ whiteSpace: "pre-wrap" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl animate-bounce">🤖</span>
                  <div>{roast}</div>
                </div>
              </div>
            )}

            {loading && (
              <div className="mt-4 flex items-center justify-center p-5 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="absolute bottom-4 w-full text-center text-gray-400 text-sm">
          © 2025 GitHub Roaster — Made with 🔥 by devs who roast back.
        </footer>
      </div>
    </>
  );
}
