import React from 'react';

const Support: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md my-3 mx-auto mt-20 w-3/5">
      <h2 className="text-2xl font-bold mb-4">Support</h2>
      <p className="text-gray-700 mb-4">
        If you need assistance, please reach out to our support team through the following channels:
      </p>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
        <p className="text-gray-600 mb-2">Email: <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a></p>
        <p className="text-gray-600">Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</a></p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">FAQs</h3>
        <ul className="list-disc pl-5 text-gray-600">
          <li><a href="/faq" className="text-blue-600 hover:underline">Frequently Asked Questions</a></li>
          <li><a href="/troubleshooting" className="text-blue-600 hover:underline">Troubleshooting Guide</a></li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Support Hours</h3>
        <p className="text-gray-600">Monday - Friday: 9 AM - 5 PM</p>
        <p className="text-gray-600">Saturday: 10 AM - 4 PM</p>
        <p className="text-gray-600">Sunday: Closed</p>
      </div>

      <div>
        <p className="text-gray-600">
          For immediate assistance, you can use our live chat feature on our website. 
        </p>
      </div>
    </div>
  );
};

export default Support;
