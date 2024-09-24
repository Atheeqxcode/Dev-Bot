import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Dev Bot</p>
        <img src={assets.user_icon} alt="" />
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
                <p>Suggest Beutiful Places to see on an upcoming Road Trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => setInput("Good Courses other than Engineering?")}
              >
                <p>Good Courses than Engineering?</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  setInput("Summarize Concept: Software Engineering")
                }
              >
                <p>Summarize Concept: Software Engineering </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => setInput("Interview Questions on MERN Stack")}
              >
                <p>Interview Questions on Mern Stack</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
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
              placeholder="Enter Your Prompt here"
              onKeyDown={(e) => {
                if (e.key === "Enter" && input) {
                  onSent();
                }
              }}
            />

            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Dev Bot is Currently Under Development, May be inaccurate sometimes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
