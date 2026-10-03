import { useState } from "react";

type Product = {
  name: string;
  price: number;
  rating: number;
};

const products: Product[] = [
  {
    name: "Smart Watch Pro",
    price: 2999,
    rating: 4.5,
  },
  {
    name: "Wireless Headphones",
    price: 2499,
    rating: 4.7,
  },
  {
    name: "Mechanical RGB Keyboard",
    price: 3499,
    rating: 4.6,
  },
  {
    name: "Ergonomic Wireless Mouse",
    price: 1499,
    rating: 4.4,
  },
  {
    name: "Fitness Smart Band",
    price: 1799,
    rating: 4.3,
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 1999,
    rating: 4.6,
  },
  {
    name: "Gaming Mouse",
    price: 1899,
    rating: 4.5,
  },
  {
    name: "USB-C Fast Charger",
    price: 999,
    rating: 4.4,
  },
];

function getReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("hello") || text.includes("hi")) {
    return "Hi! 👋 I'm INFYSHOP AI. Ask me about products, prices, ratings or recommendations.";
  }

  if (
    text.includes("cheap") ||
    text.includes("cheapest")
  ) {
    const product = [...products].sort(
      (a, b) => a.price - b.price
    )[0];

    return `The cheapest product is ${product.name} at ₹${product.price.toLocaleString(
      "en-IN"
    )}.`;
  }

  if (
    text.includes("best rated") ||
    text.includes("highest rated")
  ) {
    const product = [...products].sort(
      (a, b) => b.rating - a.rating
    )[0];

    return `${product.name} has the highest rating at ⭐ ${product.rating}/5.`;
  }

  if (text.includes("headphone")) {
    return "🎧 Wireless Headphones cost ₹2,499 and have a ⭐ 4.7 rating.";
  }

  if (text.includes("keyboard")) {
    return "⌨️ Mechanical RGB Keyboard costs ₹3,499 and has a ⭐ 4.6 rating.";
  }

  if (text.includes("mouse")) {
    return "🖱️ Ergonomic Wireless Mouse is ₹1,499. Gaming Mouse is ₹1,899.";
  }

  if (text.includes("watch")) {
    return "⌚ Smart Watch Pro costs ₹2,999 and has a ⭐ 4.5 rating.";
  }

  if (text.includes("speaker")) {
    return "🔊 Portable Bluetooth Speaker costs ₹1,999 and has a ⭐ 4.6 rating.";
  }

  if (text.includes("charger")) {
    return "🔌 USB-C Fast Charger costs only ₹999.";
  }

  if (
    text.includes("recommend") ||
    text.includes("suggest")
  ) {
    return "💡 I recommend the Wireless Headphones for ₹2,499 because they have a ⭐ 4.7 rating.";
  }

  if (
    text.includes("under 2000") ||
    text.includes("below 2000")
  ) {
    return "Products under ₹2,000 include the Mouse, Fitness Smart Band, Bluetooth Speaker, Gaming Mouse and USB-C Charger.";
  }

  return "🤖 I can help with products, prices and ratings. Try asking: “What is the cheapest product?”";
}

export default function AIChat() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    {
      sender: "ai" | "user";
      text: string;
    }[]
  >([
    {
      sender: "ai",
      text: "Hi! 👋 I'm INFYSHOP AI. Ask me about products, prices, ratings or recommendations.",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message.trim();

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: userMessage,
      },
      {
        sender: "ai",
        text: getReply(userMessage),
      },
    ]);

    setMessage("");
  };

  if (!open) {
    return (
      <button
        className="ai-floating-button"
        onClick={() => setOpen(true)}
      >
        🤖
      </button>
    );
  }

  return (
    <div className="ai-chat">
      <div className="ai-header">
        <div>
          <strong>🤖 INFYSHOP AI</strong>

          <small>Smart Shopping Assistant</small>
        </div>

        <button onClick={() => setOpen(false)}>
          ×
        </button>
      </div>

      <div className="ai-messages">
        {messages.map((item, index) => (
          <div
            key={index}
            className={`ai-message ${
              item.sender === "user"
                ? "user-message"
                : "bot-message"
            }`}
          >
            {item.text}
          </div>
        ))}

        <div className="ai-quick-buttons">
          <button
            onClick={() => {
              const text = "Cheapest";

              setMessages((previous) => [
                ...previous,
                {
                  sender: "user",
                  text,
                },
                {
                  sender: "ai",
                  text: getReply(text),
                },
              ]);
            }}
          >
            Cheapest
          </button>

          <button
            onClick={() => {
              const text = "Best rated";

              setMessages((previous) => [
                ...previous,
                {
                  sender: "user",
                  text,
                },
                {
                  sender: "ai",
                  text: getReply(text),
                },
              ]);
            }}
          >
            Best Rated
          </button>

          <button
            onClick={() => {
              const text = "Headphones";

              setMessages((previous) => [
                ...previous,
                {
                  sender: "user",
                  text,
                },
                {
                  sender: "ai",
                  text: getReply(text),
                },
              ]);
            }}
          >
            🎧 Headphones
          </button>

          <button
            onClick={() => {
              const text = "Keyboard";

              setMessages((previous) => [
                ...previous,
                {
                  sender: "user",
                  text,
                },
                {
                  sender: "ai",
                  text: getReply(text),
                },
              ]);
            }}
          >
            ⌨️ Keyboard
          </button>
        </div>
      </div>

      <div className="ai-input-area">
        <input
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask about products..."
        />

        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}