import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {

  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [predictions, setPredictions] = useState(0);
  const accuracy = 98;

  const predictSpam = (message) => {

    const spamKeywords = [
      "congratulations","won","claim","prize","click","free","offer"
    ];

    const lower = message.toLowerCase();

    const spamCount = spamKeywords.filter(word =>
      lower.includes(word)
    ).length;

    const isSpam = spamCount > 0;
    const confidence = Math.min(spamCount * 0.15 + 0.2, 0.99);

    return { isSpam, confidence };
  };

  const handleCheck = () => {

    if(!message.trim()) return;

    const res = predictSpam(message);

    setResult(res);
    setPredictions(predictions + 1);
  };

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h1 className={styles.title}>SpamShield AI</h1>
      </div>

      <div className={styles.inputSection}>
        <textarea
          className={styles.inputField}
          placeholder="Enter message..."
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />

        <button
          className={styles.checkButton}
          onClick={handleCheck}
        >
          Check Message
        </button>
      </div>

      {result && (
        <div className={styles.resultSection}>

          <h2 className={styles.resultLabel}>
            {result.isSpam ? "Spam 🚫" : "Not Spam ✅"}
          </h2>

          <p className={styles.confidenceText}>
            Confidence: {(result.confidence * 100).toFixed(1)}%
          </p>

          <div className={styles.messageDisplay}>
            {message}
          </div>

        </div>
      )}

      <div className={styles.statsSection}>
        <div>
          <h3>{accuracy}%</h3>
          <p>Accuracy</p>
        </div>

        <div>
          <h3>{predictions}</h3>
          <p>Predictions</p>
        </div>
      </div>

    </div>
  );
}
