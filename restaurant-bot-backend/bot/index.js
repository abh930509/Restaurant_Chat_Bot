const {
  getMenuItems,
  getRecommendations,
  getAllRestaurants,
  saveReservation,
} = require("../models/db.js");

const {
  ConversationAnalysisClient,
  AzureKeyCredential,
} = require("@azure/ai-language-conversations");

const client = new ConversationAnalysisClient(
  process.env.AZURE_CLU_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_CLU_KEY)
);

const projectName = process.env.AZURE_CLU_PROJECT_NAME;
const deploymentName = process.env.AZURE_CLU_DEPLOYMENT_NAME;

let chatCart = [];
let reservations = {}; // You can later store this per session

const analyzeMessage = async (text) => {
  try {
    const response = await client.analyzeConversation({
      kind: "Conversation",
      analysisInput: {
        conversationItem: {
          id: "1",
          participantId: "user",
          text,
        },
        modality: "text",
        language: "en",
      },
      parameters: { projectName, deploymentName, verbose: true },
    });

    const intent = response.result.prediction.topIntent;
    console.log("INTENT:", intent);

    switch (intent) {
      case "ViewMenu": {
        const menu = await getMenuItems();
        return {
          reply: "📋 Here's our current menu:",
          menu,
        };
      }

      case "OrderFood": {
        const menu = await getMenuItems();
        const matched = menu.filter((item) =>
          new RegExp(`\\b${item.name.toLowerCase()}\\b`).test(
            text.toLowerCase()
          )
        );

        if (matched.length > 0) {
          matched.forEach((item) => {
            if (!chatCart.find((i) => i.name === item.name)) {
              chatCart.push(item);
            }
          });

          const addedNames = matched.map((i) => i.name).join(", ");
          return {
            reply: `✅ Added ${addedNames} to your cart. Type "Show my cart" or "Pay now".`,
          };
        } else {
          return {
            reply:
              "❌ I couldn't find those items in the menu. Please try again.",
          };
        }
      }

      case "ShowCart": {
        if (chatCart.length === 0) {
          return {
            reply: " Your cart is empty. Add something from the menu first!",
          };
        }

        const total = chatCart.reduce((sum, item) => sum + item.price, 0);
        const names = chatCart.map((i) => i.name).join(", ");
        return {
          reply: `🛒 Your cart: ${names} | Total: ₹${total}.`,
          cart: chatCart,
          total,
        };
      }

      case "PayNow": {
        if (chatCart.length === 0) {
          return { reply: " Cart is empty. Add items first!" };
        }
        const totalAmount = chatCart.reduce((sum, item) => sum + item.price, 0);
        return {
          reply: "💳 Processing payment...",
          pay: { amount: totalAmount, cart: chatCart },
        };
      }

      case "TrackOrder": {
        return {
          reply: "🚚 Your order is on the way! ETA: 15 minutes.",
          track: true,
        };
      }

      case "ReserveTable": {
        return {
          reply:
            "📅 Please share your name, date, time, and number of guests for the reservation.",
        };
      }

      case "ConfirmReservation": {
        const { name, date, time, guests } = extractReservationDetails(text);
        if (name && date && time && guests) {
          await saveReservation(name, date, time, guests);
          return {
            reply: `✅ Reservation confirmed for ${guests} guests on ${date} at ${time}, ${name}.`,
            reservation: { name, guests, date, time },
          };
        }
        return {
          reply:
            "⚠️ Please provide all reservation details (name, date, time, guests).",
        };
      }

      case "GetRecommendation": {
        const recs = await getRecommendations();
        const names = recs.map((i) => i.name).join(", ");
        return {
          reply: `✨ Based on preferences, we recommend: ${names}`,
        };
      }

      case "FindRestaurant": {
        const filters = {};
        if (text.includes("Chinese")) filters.cuisine = "Chinese";
        if (text.includes("Italian")) filters.cuisine = "Italian";
        if (text.includes("Delhi")) filters.location = "Delhi";
        if (text.includes("Jaipur")) filters.location = "Jaipur";

        const results = await getAllRestaurants(filters);
        if (results.length === 0) {
          return { reply: "🔍 Sorry, no restaurants found for your search." };
        }
        const names = results.map((r) => r.name).join(", ");
        return {
          reply: `🍽️ Found restaurants: ${names}`,
        };
      }

      default:
        return {
          reply: "🤖 Sorry, I didn't understand that. Can you rephrase?",
        };
    }
  } catch (error) {
    console.error("❌ Bot error:", error.message);
    return { reply: "❌ Something went wrong. Try again later." };
  }
};

const extractReservationDetails = (text) => {
  const nameMatch = text.match(/name is (\w+)/i);
  const dateMatch = text.match(/\b\d{4}-\d{2}-\d{2}\b/);
  const timeMatch = text.match(/\b\d{1,2}:\d{2}\b/);
  const guestMatch = text.match(/(\d+) (people|guests)/i);

  return {
    name: nameMatch?.[1],
    date: dateMatch?.[0],
    time: timeMatch?.[0],
    guests: guestMatch?.[1],
  };
};

module.exports = analyzeMessage;
