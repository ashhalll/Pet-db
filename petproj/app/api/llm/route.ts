const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

<<<<<<< HEAD
<<<<<<< HEAD
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a chatbot that only provides answers related to pets (animal care, breeds, adoption, health)",
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    
  });
=======
const apiKey = process.env.API_KEY as string;
// const genAI = new GoogleGenerativeAI(apiKey);
=======
const apiKey = process.env.API_KEY as string;
// const genAI = new GoogleGenerativeAI(apiKey);

// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   systemInstruction: "You are a chatbot that only provides answers related to pets (animal care, breeds, adoption, health)",
// });

const systemPrompt = `You are a chatbot that only provides answers related to pets (animal care, breeds, adoption, health)`;
>>>>>>> ba4a6a840c4f0c36e6d7c4e8cf8a7d3ce79f7833

// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   systemInstruction: "You are a chatbot that only provides answers related to pets (animal care, breeds, adoption, health)",
// });

const systemPrompt = `You are a chatbot that only provides answers related to pets (animal care, breeds, adoption, health)`;
>>>>>>> upstream/main

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();