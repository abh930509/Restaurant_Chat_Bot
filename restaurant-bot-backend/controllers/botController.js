const analyzeMessage = require("../bot");

exports.receiveBotMessage = async (req, res) => {
  const { text } = req.body;
  const userId = req.user?.id || null; //

  if (!text) {
    return res.status(400).json({ reply: "⚠️ Message text is required." });
  }

  try {
    const result = await analyzeMessage(text, userId);

    return res.json({
      reply: result.reply || "",
      menu: result.menu || [],
      cart: result.cart || [],
      total: result.total || 0,
      pay: result.pay || null,
      orderId: result.orderId || null,
      track: result.track || false,
      reservation: result.reservation || null,
    });
  } catch (err) {
    console.error("❌ Bot controller error:", err.message);
    return res.status(500).json({
      reply: "❌ Bot is currently unavailable. Please try again shortly.",
    });
  }
};
