import React from 'react';
import { useAppContext } from '../context/AppContext';

const Footer: React.FC = () => {
    const { t } = useAppContext();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'Facebook', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg> },
        { name: 'Instagram', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg> },
        { name: 'WhatsApp', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.459l-6.162 1.688zm7.821-1.117l.482.282c1.499.881 3.221 1.345 5.021 1.344 5.457 0 9.899-4.442 9.9-9.898.001-5.457-4.443-9.9-9.9-9.9-5.457 0-9.899 4.442-9.9 9.898 0 1.839.52 3.565 1.438 5.065l.298.483-1.015 3.712 3.712-1.015z"/></svg> },
    ];

    return (
        <footer className="bg-secondary text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h2 className="text-2xl font-bold font-serif text-primary">LocaMarrakech</h2>
                        <p className="mt-2 text-sm text-gray-400">{t('footerDescription')}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white uppercase">{t('usefulLinks')}</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#/about" className="hover:text-primary transition-colors">{t('about')}</a></li>
                            <li><a href="#/contact" className="hover:text-primary transition-colors">{t('contact')}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">{t('privacyPolicy')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white uppercase">{t('contact')}</h3>
                         <ul className="mt-4 space-y-2 text-gray-400">
                            <li>Rue Mohamed El Beqal, Gueliz, Marrakech</li>
                            <li>contact@locamarrakech.com</li>
                            <li>+212 123 456 789</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white uppercase">Suivez-nous</h3>
                        <div className="flex mt-4 space-x-4">
                           {socialLinks.map(link => (
                               <a key={link.name} href={link.href} className="text-gray-400 hover:text-primary transition-colors">
                                   <span className="sr-only">{link.name}</span>
                                   {link.icon}
                               </a>
                           ))}
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {currentYear} LocaMarrakech. {t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;