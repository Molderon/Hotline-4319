const axios = require('axios');

exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // Netlify sends form data as a URL-encoded string
        const params = new URLSearchParams(event.body);
        
        // Match these names exactly to the 'name' attributes in your HTML
        const name = params.get('name');
        const email = params.get('email');
        const subject = params.get('subject');
        const message = params.get('message');
        const botField = params.get('bot-field');

        // 1. HONEYPOT CHECK
        if (botField) {
            console.log("Bot detected. Silently dropping.");
            return { statusCode: 200, body: "OK" };
        }

        // 2. DISCORD WEBHOOK
        // We use process.env so your secret URL isn't in the code
        await axios.post(process.env.DISCORD_WEBHOOK_URL, {
            content: "📡 **NEW SYSTEM TRANSMISSION**",
            embeds: [{
                title: `Subject: ${subject}`,
                color: 0x00ffff, // Cyan
                fields: [
                    { name: "Operator", value: name, inline: true },
                    { name: "Contact", value: email, inline: true },
                    { name: "Message", value: `\`\`\`${message}\`\`\`` }
                ],
                footer: { text: "ControlSystems.sh | Secure Relay" },
                timestamp: new Date()
            }]
        });

        // 3. SUCCESS REDIRECT
        return {
            statusCode: 303,
            headers: { "Location": "/#top" } // Sends user back to top after sending
        };

    } catch (err) {
        console.error("Relay Error:", err);
        return { statusCode: 500, body: "Internal Server Error" };
    }
};