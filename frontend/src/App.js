import React, { useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:8000';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      body: form
    });
    const data = await res.json();
    setMessage(data.msg || data.detail);
    if (data.msg) setShowSignUp(false);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    const res = await fetch(`${API_URL}/token`, {
      method: 'POST',
      body: form
    });
    const data = await res.json();
    if (data.access_token) {
      setToken(data.access_token);
      setMessage('Signed in!');
    } else {
      setMessage(data.detail);
    }
  };

  const handleSignout = () => {
    setToken('');
    setOcrText('');
    setMessage('Signed out.');
  };

  const handleOcr = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file.');
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${API_URL}/ocr`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form
    });
    const data = await res.json();
    if (data.file_path) {
      setOcrText('Image uploaded: ' + data.file_path);
      setMessage('Upload successful!');
    } else {
      setMessage(data.detail || 'Upload failed.');
    }
  };

  return (
    <div className="ocr-container">
      <h2>FastAPI OCR App</h2>
      {!token ? (
        <>
          {showSignUp ? (
            <>
              <form onSubmit={handleSignup}>
                <h3>Sign Up</h3>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input-block"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input-block"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Sign Up</button>
              </form>
              <div style={{textAlign:'center'}}>
                Already have an account?{' '}
                <button type="button" style={{background:'none',color:'#2563eb',border:'none',cursor:'pointer',padding:0}} onClick={()=>{setShowSignUp(false);setMessage('')}}>
                  Sign In
                </button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleSignin}>
                <h3>Sign In</h3>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input-block"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input-block"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Sign In</button>
              </form>
              <div style={{textAlign:'center'}}>
                Don't have an account?{' '}
                <button type="button" style={{background:'none',color:'#2563eb',border:'none',cursor:'pointer',padding:0}} onClick={()=>{setShowSignUp(true);setMessage('')}}>
                  Sign Up
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <button onClick={handleSignout}>Sign Out</button>
          <form onSubmit={handleOcr} style={{ marginTop: 16 }}>
            <h3>Upload Image</h3>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required />
            <button type="submit">Upload</button>
          </form>
          {ocrText && (
            <div style={{ marginTop: 16 }}>
              <h4>Upload Result:</h4>
              <textarea value={ocrText} readOnly rows={3} style={{ width: '100%' }} />
            </div>
          )}
        </>
      )}
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;
