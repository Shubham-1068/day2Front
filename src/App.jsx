import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLog, setIsLog] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("isLog") === "true";
    const storedUser = localStorage.getItem("username");
    if (isLogged && storedUser) {
      setIsLog(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://day2back.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setIsLog(true);
        localStorage.setItem("isLog", "true");
        localStorage.setItem("username", username);
        toast.success(data.message || "Login successful!");
      } else {
        toast.error(data.message || "Invalid username or password");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    setIsLog(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem("isLog");
    localStorage.removeItem("username");
    toast.info("Logged out");
  };

  return (
    <>
      <ToastContainer />
      {isLog ? (
        <div className="container">
          {/* Navbar */}
          <div className="navbar">
            <span>Dashboard</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <div>
              <h1>Welcome {username} 👋</h1>
              <p>Explore upcoming events and stay updated!</p>
              <p>📌 Hackathon – May 5th</p>
              <p>📌 Workshop – May 5th</p>
              <p>📌 Weekly Meeting – Fridays 5 PM</p>
              <p>📌 Your flag is: {`ISTEHITSC{Brut3F0rc3_Succ3ss}`}</p>
              <p>Enjoy the day!!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-form-container">
          <div className="login-card">
            <div className="avatar">
              <span className="text-3xl">👤</span>
            </div>
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
