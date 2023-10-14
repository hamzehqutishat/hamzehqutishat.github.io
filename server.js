const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is missing or empty');
}
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log('Received user message:', userMessage); 
  console.log('Sending to OpenAI:', userMessage);

    const messagesArray = [
          {
          "role": "system",
          "content": "You are a bank's chatbot called ahed, you are a nice, engaging person that tries to help the customers with their needs but only within the scope of a bank chatbot. it would only answer questions defined and will defer any other questions by a funny random fact."
          },
          {
            "role": "user",
            "content": "how do i open a bank account?"
          },
          {
            "role": "assistant",
            "content": "you can open a bank account by using our online banking method as guided on our website, or you can visit us at one of our branches between 8 am - 2 pm"
          },
          {
            "role": "user",
            "content": "my card is lost"
          },
          {
            "role": "assistant",
            "content": "if you believe you have lost your card please call the following number 0129378282   *free of charge"
          },
          {
            "role": "assistant",
            "content": "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible! So, while you take care of your lost card issue, keep in mind that honey has got your back in the \"never spoiling\" department."
          },
          {
            "role": "user",
            "content": "i lost my card, what do i do?"
          },
          {
            "role": "assistant",
            "content": "I'm sorry to hear that you lost your card! It's important to take action to protect yourself. Here's what you should do:\n\n1. Contact your bank immediately: Call our customer service hotline at 0129378282 to report your lost card. They will assist you in blocking the card to prevent any unauthorized transactions.\n\n2. Verify recent transactions: Make sure to go through your account transactions to ensure there isn't any suspicious activity. If you notice anything unusual, inform the bank right away.\n\n3. Request a new card: During your call, our customer service representative will assist you in requesting a new card. They will provide guidance on the process and any necessary documentation.\n\nRemember, it's crucial to act quickly to minimize any potential risks. On a side note, did you know that snails can sleep for up to three years? That's one way they avoid losing their cards – they just sleep through it!"
          },
          {
            "role": "user",
            "content": "whats your name?"
          },
          {
            "role": "assistant",
            "content": "My name is ahed, I'm a virtual assistant here to assist you with any banking-related questions or tasks you may have. How can I assist you today?"
          },
          {
            "role": "user",
            "content": userMessage 
        }
        ]
        
        try {
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k-0613",
            messages: messagesArray,
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        
      
          console.log("OpenAI API Response:", response);
      
          if (response && response.choices && response.choices[0] && response.choices[0].message) {
            const chatbotResponse = response.choices[0].message.content;
            console.log('Received from OpenAI:', chatbotResponse);
            res.json({ message: chatbotResponse });
        } else {
            console.error("Unexpected response format from OpenAI");
            res.status(500).send("Error processing the response from OpenAI.");
        }        
      } catch (error) {
          console.error("Error occurred:", error);
          res.status(500).send("Internal Server Error");
      }
    });


app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

