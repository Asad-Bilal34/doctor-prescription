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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-8 py-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">Ahmad Bilal Dental Clinic</h1>
          {/* <p className="text-blue-200 text-sm">احمد بلال ڈینٹل کلینک</p> */}
        </div>
        <div className="p-8">
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          {pendingApproval && <div className="bg-orange-50 border-l-4 border-orange-500 text-orange-700 px-4 py-3 rounded mb-4">Your account is pending admin approval. This page will update automatically once approved.</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 disabled:from-blue-400 disabled:to-blue-300 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account? <a href="/register" className="text-orange-600 hover:text-orange-700 font-semibold">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
