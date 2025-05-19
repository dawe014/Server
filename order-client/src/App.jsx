import { useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [responseURL, setResponseURL] = useState("");

  const baseUrl = "https://telebirr-test-wnp8.onrender.com"; // You might want to make this dynamic for production

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/create/order`, {
        title,
        amount,
      });
      setResponseURL(res.data);
      console.log("Order created successfully:", res.data);
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  const startPay = () => {
    window.handleinitDataCallback = function () {
      window.location.href = window.location.origin;
    };

    if (!amount || !title) {
      console.warn("Title and amount are required.");
      return;
    }

    fetch(`${baseUrl}/create/order`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount,
      }),
    })
      .then((res) => res.text())
      .then((rawRequest) => {
        if (!rawRequest || typeof rawRequest === "undefined") return;
        if (!window.consumerapp) {
          console.log("This is not opened in app!");
          return;
        }

        const obj = JSON.stringify({
          functionName: "js_fun_start_pay",
          params: {
            rawRequest: rawRequest.trim(),
            functionCallBackName: "handleinitDataCallback",
          },
        });

        window.consumerapp.evaluate(obj);
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Order</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Submit Order (Web)
        </button>

        <button
          type="button"
          onClick={startPay}
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Start Pay (App)
        </button>

        {responseURL && (
          <div className="mt-4 text-sm text-green-600 break-all">
            Redirect URL:{" "}
            <a href={responseURL} target="_blank" rel="noopener noreferrer">
              {responseURL}
            </a>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
