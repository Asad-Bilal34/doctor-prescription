import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [pendingApproval, setPendingApproval] = useState(false);

  // poll for approval using token stored in localStorage
  const startPollingApproval = (interval = 5000) => {
    const timer = setInterval(async () => {
      try {
        const stored = localStorage.getItem('auth');
        if (!stored) return;
        const { token } = JSON.parse(stored);
        if (!token) return;
        const API = (import.meta as any).env.VITE_API_URL || 'http://127.0.0.1:4001';
        const res = await fetch(`${API}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const j = await res.json();
        if (j.data && j.data.approved) {
          clearInterval(timer);
          // refresh local auth user
          const stored2 = localStorage.getItem('auth');
          if (stored2) {
            const s = JSON.parse(stored2);
            s.user = { ...s.user, approved: true };
            localStorage.setItem('auth', JSON.stringify(s));
          }
          setPendingApproval(false);
          navigate('/?view=new');
        }
      } catch (err) {
        // ignore
      }
    }, interval);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.user && data.user.approved === false) {
        setPendingApproval(true);
        startPollingApproval();
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>DocScript Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pendingApproval && <p style={{ color: 'orange' }}>Your account is pending admin approval. This page will update automatically once approved.</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}
