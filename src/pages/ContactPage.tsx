import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a delay for form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] to-[#f1f4ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2d3748] mb-4">Contact Us</h1>
          <p className="text-[#4a5568] text-lg max-w-3xl mx-auto">
            We're here to assist you. If you have any issues or inquiries, please don't hesitate to reach out.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#ebf4ff]">
            <div className="flex items-center mb-4">
              <Mail className="h-8 w-8 text-[#5a67d8]" />
              <h2 className="text-xl font-semibold ml-2">Email Us</h2>
            </div>
            <p className="text-[#4a5568]">cancerdetector@gmail.com</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#ebf4ff]">
            <div className="flex items-center mb-4">
              <Phone className="h-8 w-8 text-[#5a67d8]" />
              <h2 className="text-xl font-semibold ml-2">Call Us</h2>
            </div>
            <p className="text-[#4a5568]">+1 (800) 123-4567</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#ebf4ff]">
            <div className="flex items-center mb-4">
              <MapPin className="h-8 w-8 text-[#5a67d8]" />
              <h2 className="text-xl font-semibold ml-2">Visit Us</h2>
            </div>
            <p className="text-[#4a5568]">123 Sunset Street, Suite 100, Cityville</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg ">
          <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>

          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center animate__animated animate__fadeIn">
              <p>Your message has been sent successfully! We will get back to you</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-[#2d3748]" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a67d8] transition-all duration-300 transform hover:scale-105"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-[#2d3748]" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a67d8] transition-all duration-300 transform hover:scale-105"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-[#2d3748]" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-4 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a67d8] transition-all duration-300 transform hover:scale-105"
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full py-3 px-6 bg-[#5a67d8] text-white font-semibold rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} transform hover:scale-105 transition-all duration-300`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;