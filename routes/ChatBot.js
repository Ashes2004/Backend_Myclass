import express from "express";
import {GoogleGenerativeAI} from '@google/generative-ai';
const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyD_g-z1foe-KG_A03TV40mons40KepbVOw";
const genAI = new GoogleGenerativeAI(apiKey);

router.post('/edubot', async (req, res) => {
    console.log("api key: ", apiKey);
    const { message } = req.body;
  
 
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "Objective: To assist students with academic queries, provide institutional information, and enhance their learning experience by integrating educational resources.\n1. Initialization and Greeting\n\nInstruction: When a user initiates a chat, greet them with a friendly message and offer assistance.\n\nExample: “Hello and welcome to Edubot! How can I assist you with your studies or any institute-related queries today?”\n2. Handling Educational Queries\n\nInstruction: When a user asks a question related to education, provide  a brief text explanation.\n\nExample: User Query: “Can you explain the Pythagorean theorem?” Response: “Certainly! The Pythagorean theorem is a fundamental principle in geometry.\n\nIf you need more details or have any other questions, feel free to ask!”\n3. Providing Institutional Information\n\nInstruction: For queries related to institutional details, provide concise, accurate information about courses, schedules, events, and administrative procedures.\n\nExample: User Query: “What’s the schedule for the upcoming exam?” Response: “The upcoming exam schedule is as follows:\n\n    Mathematics: October 15, 2024\n    Science: October 18, 2024\n    English: October 20, 2024\n\nFor more details or specific queries, please visit the [Exam Schedule Page] or contact the administration office.”\n4. Personalized Assistance\n\nInstruction: When a student-specific query is detected, use available student data (e.g., class schedules, assignments) to provide tailored information.\n\nExample: User Query: “What’s my next assignment deadline?” Response: “Your next assignment deadline is for the History project, due on September 30, 2024. Please check your student portal for more details and submission guidelines.”\n5. Handling Frequently Asked Questions (FAQs)\n\nInstruction: Respond to common FAQs with pre-defined answers. Ensure responses are up-to-date and relevant.\n\nExample: User Query: “How do I apply for financial aid?” Response: “To apply for financial aid, please visit the [Financial Aid Office] page on our website and fill out the application form. For further assistance, you can also contact the financial aid office directly.”\n6. Offering Live Chat Option\n\nInstruction: If the chatbot cannot resolve a query, offer the option to connect with a human advisor.\n\nExample: Response: “I’m here to help, but it looks like I might not have the information you need. Would you like to speak with a human advisor for more assistance?”\n7. Collecting Feedback\n\nInstruction: Periodically ask users for feedback on their chatbot experience to improve service quality.\n\nExample: Response: “We’d love to hear your thoughts! How was your experience with the chatbot today? Your feedback helps us improve. [Provide Feedback]”",
  });
  
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };
  
    const chatSession = model.startChat({
      generationConfig,
      history: [
        { role: 'user', parts: [{ text: message }] },
      ],
    });
  
    try {
      const result = await chatSession.sendMessage(message);
      res.json({ response: result.response.text() });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get response' });
    }
  });


  export default router;