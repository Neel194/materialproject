import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Show popup
    setShowPopup(true);

    // Clear form fields after submission
    setFormData({ name: "", email: "", message: "" });

    // Hide popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-8 tracking-tight">
          Contact Us
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="mb-6 flex items-center border border-gray-200 dark:border-gray-600 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <i className="fas fa-user text-blue-500 mr-3"></i>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full outline-none bg-transparent text-gray-800 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          <div className="mb-6 flex items-center border border-gray-200 dark:border-gray-600 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <i className="fas fa-envelope text-blue-500 mr-3"></i>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full outline-none bg-transparent text-gray-800 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          <div className="mb-6 flex items-start border border-gray-200 dark:border-gray-600 rounded-lg p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <i className="fas fa-comment-dots text-blue-500 mr-3 mt-1"></i>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full outline-none bg-transparent text-gray-800 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none h-32"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm transition-all duration-200 text-lg tracking-wide mt-4"
          >
            Send Message
          </button>
        </form>

        {/* Feedback Submitted Popup */}
        {showPopup && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-center animate-fadeIn flex items-center gap-2 z-50">
            <span className="text-xl">✔️</span> Feedback Submitted!
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
