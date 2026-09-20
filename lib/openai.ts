import OpenAI from "openai";

const MODEL = process.env.OPENAI_MODEL ?? "";
const SYSTEM_PROMPT =
  "You are NullBreach, an expert cybersecurity assistant. Give precise, practical advice grounded in OWASP and secure-development practices.";

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "sk-...")
    throw new Error("OPENAI_API_KEY is not configured.");
  if (!MODEL) throw new Error("OPENAI_MODEL is not configured.");
  return new OpenAI({ apiKey });
}

async function complete(prompt: string) {
  const response = await getClient().responses.create({
    model: MODEL,
    max_output_tokens: 2048,
    instructions: SYSTEM_PROMPT,
    input: prompt,
  });
  if (!response.output_text)
    throw new Error("OpenAI returned an empty response.");
  return response.output_text;
}

export const askOpenAI = (question: string) => complete(question);
export const analyzeCode = (code: string) =>
  complete(
    `Analyze this code for OWASP vulnerabilities. Explain severity, impact, and remediation.\n\n\`\`\`\n${code}\n\`\`\``,
  );
export { MODEL as OPENAI_MODEL };
