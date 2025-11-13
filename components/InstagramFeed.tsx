
import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

// This is a global type from the Swiper CDN script
declare const Swiper: any;

const instagramPosts = [
  { id: 1, imgUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop', likes: 123, comments: 4 },
  { id: 2, imgUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop', likes: 254, comments: 12 },
  { id: 3, imgUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop', likes: 310, comments: 8 },
  { id: 4, imgUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop', likes: 450, comments: 25 },
  { id: 5, imgUrl: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=800&auto=format&fit=crop', likes: 189, comments: 9 },
  { id: 6, imgUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop', likes: 288, comments: 15 },
];

const InstagramFeed: React.FC = () => {
    const { t } = useAppContext();
    const swiperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (swiperRef.current) {
            const swiper = new Swiper(swiperRef.current, {
                loop: true,
                spaceBetween: 16,
                slidesPerView: 2,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 24,
                    },
                },
            });
        }
    }, []);

    return (
        <section className="bg-background-light py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t('instagramTitle')}</h2>
                    <a href="https://instagram.com/locamarrakech" target="_blank" rel="noopener noreferrer" className="text-primary text-lg font-semibold hover:underline">
                        {t('instagramUsername')}
                    </a>
                </div>
                
                <div className="relative">
                    <div ref={swiperRef} className="swiper">
                        <div className="swiper-wrapper">
                            {instagramPosts.map(post => (
                                <div key={post.id} className="swiper-slide">
                                    <a href="https://instagram.com/locamarrakech" target="_blank" rel="noopener noreferrer" className="group relative block w-full aspect-square overflow-hidden rounded-lg">
                                        <img src={post.imgUrl} alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="flex items-center space-x-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm font-semibold">{post.likes}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm1.5 0a.5.5 0 00-.5.5v1.28l6.25 4.69a.5.5 0 00.5 0L17 6.78V5.5a.5.5 0 00-.5-.5h-13zM17 8.12l-5.69 4.27a1.5 1.5 0 01-1.62 0L3 8.12V15.5a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V8.12z" />
                                                    </svg>
                                                    <span className="text-sm font-semibold">{post.comments}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Navigation Arrows */}
                    <div className="swiper-button-prev -left-2 sm:-left-4"></div>
                    <div className="swiper-button-next -right-2 sm:-right-4"></div>
                </div>

            </div>
        </section>
    );
};

export default InstagramFeed;