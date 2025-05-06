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
    <section className="py-16 bg-white dark:bg-black relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg text-center mb-8 tracking-tight animate-gradient">
          Contact Us
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white dark:bg-black p-8 rounded-lg shadow-lg"
        >
          <div className="mb-4 flex items-center border border-gray-300 dark:border-neutral-800 rounded-lg p-3 focus-within:border-indigo-500 transition">
            <i className="fas fa-user text-indigo-500 mr-3"></i>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full outline-none bg-transparent text-white font-semibold placeholder:text-indigo-200/70"
            />
          </div>

          <div className="mb-4 flex items-center border border-gray-300 dark:border-neutral-800 rounded-lg p-3 focus-within:border-indigo-500 transition">
            <i className="fas fa-envelope text-indigo-500 mr-3"></i>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full outline-none bg-transparent text-white font-semibold placeholder:text-indigo-200/70"
            />
          </div>

          <div className="mb-4 flex items-start border border-gray-300 dark:border-neutral-800 rounded-lg p-3 focus-within:border-indigo-500 transition">
            <i className="fas fa-comment-dots text-indigo-500 mr-3 mt-1"></i>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full outline-none bg-transparent text-white font-semibold placeholder:text-indigo-200/70 resize-none h-32"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white font-bold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg text-lg tracking-wide mt-4"
          >
            Send Message
          </button>
        </form>

        {/* Feedback Submitted Popup with ✅ Emoji */}
        {showPopup && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-center animate-fadeIn flex items-center gap-2">
            <span className="text-xl">✔️</span> Feedback Submitted!
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
