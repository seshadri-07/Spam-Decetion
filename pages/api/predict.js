class NaiveBayes {

  constructor() {
    this.spamWords = ['win','prize','free','offer','click','urgent'];
    this.hamWords = ['hello','meeting','thanks','see','later'];
  }

  predict(text) {

    text = text.toLowerCase();

    let spamScore = 0;
    let hamScore = 0;

    this.spamWords.forEach(word => {
      if(text.includes(word)) spamScore++;
    });

    this.hamWords.forEach(word => {
      if(text.includes(word)) hamScore++;
    });

    const isSpam = spamScore > hamScore;

    const confidence = Math.abs(spamScore - hamScore) / 5;

    return {
      isSpam,
      confidence: Math.min(confidence, 0.99)
    };
  }
}

const model = new NaiveBayes();

export default function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  const result = model.predict(message);

  res.status(200).json({
    message,
    is_spam: result.isSpam,
    confidence: result.confidence,
    label: result.isSpam ? "Spam" : "Not Spam",
    emoji: result.isSpam ? "🚫" : "✅"
  });
}
