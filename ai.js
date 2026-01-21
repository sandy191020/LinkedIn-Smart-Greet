export function aiRewrite(text) {
  // Lightweight local rewrite (safe)
  return text
    .replace("thanks for connecting", "thanks for connecting 😊")
    .replace("Great to connect", "Glad to connect");
}

/*
OPTIONAL UPGRADE:
Use OpenAI / HuggingFace API here later.
(Disabled by default to avoid cost & risk)
*/
