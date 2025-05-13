const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('Chat'));
// Anasayfa rotası
// node --version # Should be >= 18
// npm install @google/generative-ai
router.get('/chat-bot', (req, res) => {
  res.sendFile(__dirname + '/Chat/index.html');
});
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyB79pPftQt9a0ZToj2nSF-iBPMV95Qi87Y";

  
  router.post('/submit', async (req, res) => {
    const userInput = req.body.userInput;
    const responseText = await runChat(userInput);
    res.send(responseText); // Send the response text back to the client
  });






  async function runChat(userInput) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
  const generationConfig = {
    temperature: 0.9,
    topK: 0,
    topP: 1,
    maxOutputTokens: 2048,
  };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  
    const result = await chat.sendMessage(userInput);
    const response = result.response;
    return response.text(); // Make sure to return the response text
  }

module.exports = router;