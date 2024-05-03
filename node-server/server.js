const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const { loadTokenizer, loadModel } = require('./llama2Utils'); // Helper functions to load tokenizer and model

const app = express();
const PORT = process.env.PORT || 5000;

// Load tokenizer and model
let tokenizer, model;
(async () => {
    tokenizer = await loadTokenizer();
    model = await loadModel();
    console.log('Llama2 model loaded successfully');
})();

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to generate text based on input
app.post('/generate', async (req, res) => {
    const inputText = req.body.input_text;

    if (!inputText || typeof inputText !== 'string') {
        return res.status(400).json({ error: 'Invalid input text' });
    }

    try {
        // Encode input text using tokenizer
        const inputIds = tokenizer.encode(inputText.toLowerCase());

        // Generate text using the model
        const inputTensor = tf.tensor2d([inputIds]);
        const outputTensor = model.predict(inputTensor);
        const generatedIds = Array.from(outputTensor.argMax(-1).dataSync());

        // Decode generated text using tokenizer
        const generatedText = tokenizer.decode(generatedIds);

        res.json({ generated_text: generatedText });
    } catch (error) {
        console.error('Error generating text:', error);
        res.status(500).json({ error: 'Failed to generate text' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
