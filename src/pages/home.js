import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-okaidia.css";
import { Message_Tous } from "./message-tout";
import { useSelector, useDispatch } from "react-redux";
import { addSession, logout, modifiesession } from "./session";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour! Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [newsession, setnewsession] = useState(true);
  const [sessionid, setsessionid] = useState(0);
  const [slide, setslide] = useState(true);
  const [loding, setloding] = useState(false);
  const Sessiondata = useSelector((state) => state.session.si);
  const dispatch = useDispatch();
  const User = useSelector((state) => state.session.user);
  const nav = useNavigate();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    const handleChange = (event) => {
      if (event.matches) {
      setslide(false);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    handleChange(mediaQuery);
    return () => mediaQuery.removeEventListener('change', handleChange);
  },[]);


  const verifie = () => {
    if (User.email === "") {
      nav("/");
    }
    
  };
  verifie();

  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);



  const handelsession_new = () => {
    setsessionid(Sessiondata.length);
    setMessages([
      {
        role: "assistant",
        content: "Bonjour! Comment puis-je vous aider aujourd'hui ?",
      },
    ]);
    setnewsession(true);
  };



  useEffect(() => {
    if (messages.length > 2) {
      dispatch(modifiesession({ id: sessionid, message: messages }));
    }
    if (messages.length > 1 && newsession) {
      dispatch(addSession(messages));
      setnewsession(false);
    }
  }, [messages, newsession]);



  const sendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setloding(true);
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-70b-8192",
          messages: newMessages,
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY_OLLAMA}`,
            "Content-Type": "application/json",
          },
        }
      );

      const assistantReply =
        response.data.choices[0]?.message?.content ||
        "Désolé, je n'ai pas pu obtenir de réponse.";
      setMessages([
        ...newMessages,
        { role: "assistant", content: assistantReply },
      ]);
    } catch (error) {
      console.error("Erreur:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Désolé, je rencontre un problème pour répondre pour le moment.",
        },
      ]);
    } finally {
      setloding(false);
    }
  };

  const handelmessageSession = (id) => {
    const content_session = Sessiondata.find((s) => s.id === id);
    if (content_session) {
      setsessionid(content_session.id);
      setMessages(content_session.content);
    }
  };

  return (
    <div className="container-home">
      {slide ? (
        ""
      ) : (
        <div
          className="ferme-barre"
          title="ferme barre"
          onClick={(e) => {
            setslide((pre) => !pre);
          }}
        >
          <img src="/icon/close.svg" alt="X" />
        </div>
      )}
      <div
        className="slide-menu"
        style={slide ? { width: "300px" } : { width: "0px" }}
      >
        <div className="button-top-menu">
          <div
            className="ferme-barre"
            title="ferme barre"
            onClick={(e) => {
              setslide((pre) => !pre);
            }}
          >
            <img src="/icon/ferme.svg" alt="X" />
          </div>

          <div className="new-session" onClick={handelsession_new}>
            <img src="/icon/new-se.svg" alt="+" title="new session" />
          </div>
        </div>
        <div className="slide-menu-center">
          {Sessiondata?.length > 0 ? (
            Sessiondata.map((msgs, i) => (
              <div
                key={i}
                onClick={() => {
                  handelmessageSession(msgs.id);
                }}
                className="session"
              >
                <div className="session-name">{msgs.title}</div>
              </div>
            ))
          ) : (
            <p style={{ color: "white", opacity: "20%" }}>
              Aucune session disponible...
            </p>
          )}
        </div>
        <div className="slide-menu-bottom">
          <div className="slide-menu-bottom-mode">
            <div className="mode-slide">
              <img src="/icon/mode-light.svg" />
              <p>Light mode</p>
            </div>
          </div>
          <div className="slide-menu-bottom-logout" onClick={()=>dispatch(logout())&& verifie }>
            <div className="logout-slide">
              <img src="/icon/logout.svg" />
              <p>Log out</p>
            </div>
          </div>
        </div>
      </div>
      <div className="body-home">
        <div className="body-container-home">
          <div className="login-body">
            <img />
          </div>
          <h1>CogniChat</h1>
          <Message_Tous
            sessionid={sessionid}
            messages={messages}
            loding={loding}
          />
          <div className="cont-btn-user">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Tapez votre message..."
              className="input-user"
            />
            <button onClick={sendMessage} className="btn-user">
              <img src="/icon/send.svg" alt="send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
