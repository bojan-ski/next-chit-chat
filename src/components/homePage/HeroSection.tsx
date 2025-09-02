import { JSX } from 'react';
import Link from 'next/link';

function HeroSection(): JSX.Element {
    return (
        <section className="relative h-screen flex items-center justify-center text-center text-white">
            {/* background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="https://www.pexels.com/download/video/7392948/" type="video/mp4" />
            </video>

            {/* overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* page content */}
            <div className="relative z-10 max-w-3xl px-4">
                <h1 className="text-5xl md:text-6xl font-bold animate-fadeIn mb-5">
                    Connect. Chat. Belong.
                </h1>

                <p className="text-lg md:text-xl text-gray-200 animate-slideUp mb-14">
                    A warm and inviting place to share your thoughts with friends & new connections.
                </p>

                <div>
                    <Link href={'/members'} className="px-10 py-4.5 bg-[#7B4B3A] hover:bg-[#C05C41] rounded-full text-white font-semibold shadow-lg transition text-lg cursor-pointer">
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSection