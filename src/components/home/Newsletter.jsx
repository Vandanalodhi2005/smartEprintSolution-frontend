import React, { useState } from "react";

const Newsletter = ({ bg = "bg-white" }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setEmail("");
  };

  return (
    <section className={`${bg} py-14 sm:py-20`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
          Unlock Exclusive Savings on Your First Order!
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl mx-auto">
          Subscribe to Smart ePrint and get access to special printer deals, expert tips, and the latest arrivals. Stay informed, print smarter, and enjoy a seamless, budget-friendly printing experience every day.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-start justify-center gap-3 max-w-lg mx-auto">
          <div className="w-full sm:flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(false);
              }}
              placeholder="ENTER YOUR EMAIL *"
              className={`w-full px-4 py-3 border ${error ? 'border-red-400' : 'border-gray-300'} rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500`}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1 text-left">This field is required.</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#EF4056] text-white px-6 py-3 rounded font-bold text-sm uppercase tracking-wider hover:bg-[#d93548] transition-colors shrink-0 cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
