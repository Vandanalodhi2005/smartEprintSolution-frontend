import React, { useState } from "react";

const FAQContent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

    const faqData = [
    {
      q: "What is Smart ePrint?",
      a: "Smart ePrint is an independent online store offering printers, inks, toners, and printing accessories across the United States and Canada. We provide genuine products, competitive prices, and expert customer support to make your printing experience simple and reliable."
    },
    {
      q: "Are the products sold by Smart ePrint genuine?",
      a: "Yes. We only offer authentic and original products from trusted global brands. All trademarks and product names belong to their respective owners and are used for identification purposes only."
    },
    {
      q: "Is Smart ePrint affiliated with any printer brand?",
      a: "No, you can checkout as a guest. However, creating an account allows you to track orders, view past purchases, and receive special offers."
    },
    {
      q: "Do you ship outside the United States?",
      a: "Yes. We currently ship to customers in both the United States and Canada. Delivery times and charges may vary depending on your location."
    },
    {
      q: "How can I track my order?",
      a: "Once your order is shipped, you’ll receive a tracking number via email. You can use this number to monitor your shipment directly through the carrier’s website or our order-tracking page."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit and debit cards, as well as secure online payment options. All transactions are processed through encrypted payment gateways to protect your information."
    },
    {
      q: "What is your return and refund policy?",
      a: "If you receive a damaged, defective, or incorrect product, please contact us within 7 days of delivery. Returns and refunds are processed according to our Return & Refund Policy, ensuring a fair and transparent resolution."
    },
    {
      q: "How can I contact Smart ePrint?",
      a: "You can reach our support team anytime Email: support@smarteprintsolution.com Phone: +1-651-815-4630 Address: 11397 Quincy St NE, Blaine, Minnesota 55434"
    },
    {
      q: "Do you offer technical support for printer setup or issues?",
      a: "Yes! Our expert support team is available 24/7 to help with printer setup, connection, and troubleshooting. You can reach out through live chat, email, or phone for quick assistance."
    },
    {
      q: "Why should I shop at Smart ePrint?",
      a: "Because we make printing simple. You get genuine products, affordable pricing, fast shipping, and friendly support — all in one trusted place."
    }
  ];

  return (
    <section className="w-full bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">

        {/* FAQ List */}
        <div className="space-y-5">
          {faqData.map((faq, faqIndex) => {
            const isOpen = openIndex === faqIndex;
            return (
              <div key={faqIndex} className="bg-gray-50 rounded-lg border border-gray-200">
                <button
                  onClick={() => toggleFAQ(faqIndex)}
                  className="w-full text-left flex items-center gap-3 px-8 py-6 cursor-pointer"
                >
                  <span className={`text-gray-400 text-lg transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                    ›
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {faq.q}
                  </h3>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out px-8 pl-14 ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}`}
                  style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
                >
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQContent;
