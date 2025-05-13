const express = require('express');
const router_speech = express.Router();
const bodyParser = require('body-parser');
const deepl = require('deepl-node')
router_speech.use(bodyParser.urlencoded({ extended: true }));
router_speech.use(express.static('SpechToText'));

const authKey = process.env.DEEPL_API_KEY; // Replace with your key
const translator = new deepl.Translator(authKey);

router_speech.get('/speech-translate', (req, res) => {
  res.sendFile(__dirname + '/SpechToText/index.html');
});
router_speech.post('/submit', async (req, res) => {
  const userInput = req.body.userInput;
  try {
    const responseText = await runChat(userInput);
    if (responseText) {
      res.send(responseText); // Başarılı çeviri metnini gönder
    } else {
      res.status(500).send('Translation failed'); // Çeviri başarısız oldu
    }
  } catch (error) {
    res.status(500).send('Error processing your request'); // İstek işlenirken hata oluştu
  }
});
async function runChat(userInput){
  try {
    const result = await translator.translateText(userInput, null, 'en-GB');
    return result.text; // Doğrudan result.text dön
  } catch (error) {
    console.error('Translation error:', error); // Hata yakalama
    return null; // Hata durumunda null dön
  }
}
module.exports = router_speech; 