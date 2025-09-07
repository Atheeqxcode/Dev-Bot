import React, { useContext } from "react";

import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context.jsx";
import VoiceButton from "../VoiceButton"; 

const Main = ({ user, onLogout }) => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    handleVoiceResult,
  } = useContext(Context);

  // Use user's avatar if available, else fallback
  const userAvatar = user && user.avatar ? user.avatar : assets.user_icon;

  return (
    <div className="main">
      <div className="nav">
        <p>Dev Bot</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={userAvatar} alt="user avatar" style={{ borderRadius: '50%', width: 40, height: 40 }} />
          <button onClick={onLogout} style={{ marginTop: 8, background: 'none', border: 'none', cursor: 'pointer' }}>
            <img src={assets.logout_icon} alt="logout" style={{ width: 32, height: 32 }} />
          </button>
        </div>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How Can I Help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  setInput(
                    "Suggest Beautiful Places to see on an upcoming Road Trip"
                  )
                }
              >
                <p>Suggest Beautiful Places to see on an upcoming Road Trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => setInput("Good Courses other than Engineering?")}
              >
                <p>Good Courses other than Engineering?</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  setInput("Summarize Concept: Software Engineering")
                }
              >
                <p>Summarize Concept: Software Engineering</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => setInput("Interview Questions on MERN Stack")}
              >
                <p>Interview Questions on MERN Stack</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={userAvatar} alt="user avatar" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.thunder} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder={
                loading ? "Loading response..." : "Enter Your Prompt here"
              }
              disabled={loading} // disable typing while waiting
              onKeyDown={(e) => {
                if (e.key === "Enter" && input) {
                  onSent(input);
                }
              }}
            />

            <div>
              <img src={assets.gallery_icon} alt="" />
              <VoiceButton onResult={handleVoiceResult} />

              {/* Always show send icon, but disable it if loading or input empty */}
              <img
                onClick={() => {
                  if (!loading && input) onSent();
                }}
                src={assets.send_icon}
                alt=""
                style={{
                  opacity: !input || loading ? 0.5 : 1,
                  pointerEvents: !input || loading ? "none" : "auto",
                }}
              />
            </div>
          </div>
          <p className="bottom-info">
            Dev Bot may be inaccurate sometimes & Authentication is not secure yet (Under Development).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
