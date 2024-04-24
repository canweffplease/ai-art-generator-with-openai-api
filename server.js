import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    organization: 'org-ORqpSdyj9Lj1wErstcQ8aigz',
    project: 'proj_iZ2jQX0tOskXxmpbz0cOVcup',
});
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: '1024x1024',
        });

        const image = aiResponse.data[0].url;
        res.send({ image });
    } catch (error) {
        console.error('Failed to generate image:', error);
        res.status(500).send({ error: 'Failed to generate image' });
    }
});

app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));