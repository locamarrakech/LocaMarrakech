
import React from 'react';
import { useAppContext } from '../context/AppContext';

const ContactPage: React.FC = () => {
  const { t } = useAppContext();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary">{t('contactUs')}</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{t('contactIntro')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white dark:bg-secondary p-8 rounded-lg shadow-lg">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">{t('name')}</label>
                <input type="text" id="name" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">{t('email')}</label>
                <input type="email" id="email" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium mb-2">{t('phone')}</label>
              <input type="tel" id="phone" className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">{t('message')}</label>
              <textarea id="message" rows={5} className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full bg-primary hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                {t('sendMessage')}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info & Map */}
        <div>
          <div className="bg-white dark:bg-secondary p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold font-serif mb-4">{t('ourLocation')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{t('address')}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Email:</strong> contact@locamarrakech.com<br /><strong>Phone:</strong> +212 123 456 789</p>
            <h3 className="text-2xl font-bold font-serif mb-2">{t('hours')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('open247')}</p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.93883391924!2d-8.02094268484647!3d31.63581798133221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee3e5a5180c5%3A0x6b7724f1e5a59d9a!2sRue%20Mohamed%20el%20Beqal%2C%20Marrakech%2040000%2C%20Morocco!5e0!3m2!1sen!2sus!4v1678886543210!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
