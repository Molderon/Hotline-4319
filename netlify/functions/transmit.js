exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // Netlify sends form data as a URL-encoded string
        const params = new URLSearchParams(event.body);
        
        const name = params.get('name') || "Anonymous Operator";
        const email = params.get('email') || "No Email Provided";
        const subject = params.get('subject') || "No Subject";
        const message = params.get('message') || "No Message Content";
        const botField = params.get('bot-field');

        // 1. HONEYPOT ANTI-SPAM CHECK
        if (botField) {
            console.log("Bot detected via honeypot. Dropping transmission.");
            return { statusCode: 200, body: JSON.stringify({ status: "Filtered" }) };
        }

        // 2. DISCORD WEBHOOK VIA NATIVE FETCH
        const discordResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: "📡 **NEW SYSTEM TRANSMISSION DETECTED**",
                embeds: [{
                    title: `Subject: ${subject}`,
                    color: 0x00ffff, // Cyber Cyan
                    fields: [
                        { name: "Operator", value: name, inline: true },
                        { name: "Contact", value: email, inline: true },
                        { name: "Message", value: `\`\`\`${message}\`\`\`` }
                    ],
                    footer: { text: "ControlSystems.sh | TU-Sofia Branch Plovdiv" },
                    timestamp: new Date().toISOString()
                }]
            })
        });

        if (!discordResponse.ok) {
            throw new Error(`Discord API responded with ${discordResponse.status}`);
        }

        // 3. SUCCESS RESPONSE
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Success", message: "Transmission Received" })
        };

    } catch (err) {
        console.error("Relay Error:", err);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ status: "Error", message: "Internal Relay Failure" }) 
        };
    }
};