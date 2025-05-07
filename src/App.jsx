import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Shield, LogOut, Calendar, Flag, Terminal, Lock, User, AlertCircle } from 'lucide-react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLog, setIsLog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem('isLog') === 'true';
    const storedUser = localStorage.getItem('username');
    if (isLogged && storedUser) {
      setIsLog(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://day2back.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLog(true);
        localStorage.setItem('isLog', 'true');
        localStorage.setItem('username', username);
        toast.success(data.message || 'Access Granted');
      } else {
        toast.error(data.message || 'Access Denied: Invalid Credentials');
      }
    } catch (error) {
      toast.error('Connection Failed: Server Unreachable');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLog(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('isLog');
    localStorage.removeItem('username');
    toast.info('Session Terminated');
  };

  return (
    <div className="app-container">
      <div className="matrix-background">
        <div className="matrix-animation"></div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      {isLog ? (
        <div className="dashboard-container">
          <nav className="dashboard-nav">
            <div className="nav-logo">
              <Terminal className="icon" />
              <span className="logo-text">CTF_CONSOLE</span>
            </div>
            <button 
              className="logout-btn" 
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="icon" />
              <span className="btn-text">LOGOUT</span>
            </button>
          </nav>

          <div className="dashboard-content">
            <div className="welcome-section">
              <div className="welcome-header">
                <h1 className="glitch" data-text={`Welcome ${username} 👨‍💻`}>Welcome {username} 👨‍💻</h1>
                <div className="terminal-line"></div>
              </div>
              
              <p className="typewriter">Initializing secure connection... Access granted to classified information.</p>
              
              <div className="event-card">
                <div className="event-header">
                  <Calendar className="icon" />
                  <h2>Upcoming CTF Events</h2>
                </div>
                <ul className="event-list">
                  <li><span className="event-date">05/05</span> <span className="event-name">Hackathon</span></li>
                  <li><span className="event-date">05/05</span> <span className="event-name">Workshop</span></li>
                  <li><span className="event-date">FRIDAYS</span> <span className="event-name">Weekly Meeting @ 17:00</span></li>
                </ul>
              </div>
              
              <div className="flag-container">
                <div className="flag-header">
                  <Flag className="icon" />
                  <h2>Captured Flag</h2>
                </div>
                <div className="flag-content">
                  <pre className="flag">{`ISTEHITSC{Brut3F0rc3_Succ3ss}`}</pre>
                  <div className="flag-message">Flag successfully captured! Congratulations, hacker.</div>
                </div>
              </div>
              
              <p className="terminal-message">$ System secure. Enjoy your session.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <div className="login-card">
            <div className="card-header">
              <Shield className="shield-icon" />
              <h2 className="login-title glitch" data-text="SECURE ACCESS">SECURE ACCESS</h2>
            </div>
            
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="terminal-btn red"></span>
                  <span className="terminal-btn yellow"></span>
                  <span className="terminal-btn green"></span>
                </div>
                <div className="terminal-title">terminal@ctf:~</div>
              </div>
              <div className="terminal-body">
                <p className="terminal-text">$ Initializing authentication protocol...</p>
                
                <form onSubmit={handleLogin} className="login-form">
                  <div className="input-group">
                    <label htmlFor="username">
                      <User className="input-icon" />
                      <span>Username</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                        className="terminal-input"
                        placeholder="Enter username"
                      />
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="password">
                      <Lock className="input-icon" />
                      <span>Password</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        className="terminal-input"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`submit-btn ${isLoading ? 'loading' : ''}`} 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>AUTHENTICATING<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span></>
                    ) : (
                      <>AUTHENTICATE</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;