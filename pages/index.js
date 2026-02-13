import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {

  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ accuracy: null, predictions: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/model-stats');
      setStats(prev => ({ ...prev, accuracy: res.data.accuracy }));
    } catch {}
  };

  const handlePredict = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Enter message");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/predict', { message });

      setResult(res.data);

      setStats(prev => ({
        ...prev,
        predictions: prev.predictions + 1
      }));

    } catch {
      setError("Prediction failed");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>SpamShield AI</h1>

      <form onSubmit={handlePredict}>
        <textarea
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Analyzing..." : "Check Message"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {result && (
        <div className={styles.result}>
          <h2>{result.label} {result.emoji}</h2>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          <p>{result.message}</p>
        </div>
      )}

      <div className={styles.stats}>
        Accuracy: {stats.accuracy ? (stats.accuracy * 100).toFixed(1) + '%' : '--'}
        <br />
        Predictions: {stats.predictions}
      </div>
    </div>
  );
}
