import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLog, setIsLog] = useState(false);

  useEffect(() => {
    const usersInStorage = localStorage.getItem("users");
    if (!usersInStorage) {
      const plainUsers = [
        { name: "hit", password: "tigger" },
        { name: "admin", password: "computer" },
        { name: "room", password: "family" },
        { name: "rockman", password: "danielle" },
        { name: "summer", password: "forever" },
        { name: "root", password: "root" },
      ];
      const hashedUsers = plainUsers.map((user) => ({
        name: user.name,
        hash: bcrypt.hashSync(user.password, 10),
      }));
      localStorage.setItem("users", JSON.stringify(hashedUsers));
    }

    const isLogged = localStorage.getItem("isLog") === "true";
    const storedUser = localStorage.getItem("username");
    if (isLogged && storedUser) {
      setIsLog(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matched = users.find(
      (user) => user.name === username && bcrypt.compareSync(password, user.hash)
    );

    if (matched) {
      setIsLog(true);
      localStorage.setItem("isLog", "true");
      localStorage.setItem("username", username);
      toast.success("Login successful!");
    } else {
      toast.error("Invalid username or password");
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
