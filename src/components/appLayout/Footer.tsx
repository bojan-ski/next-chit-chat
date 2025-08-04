import { JSX } from "react";

function Footer(): JSX.Element {
    return (
        <footer className="bg-[#FDF6F0] dark:bg-[#3B2F2F] border-t border-[#E5C6AC] dark:border-[#7C5C53] py-4 shadow-sm">
            <div className="text-center text-sm space-y-1 max-w-xl mx-auto px-4">
                <p className="font-semibold text-[#7B4B3A] dark:text-[#E8D3C4] text-lg tracking-wide">
                    &copy; 2025 <span className="text-[#C05C41] dark:text-[#D9997A]">Chit Chat</span>
                </p>
                <p className="text-[#A3776E] dark:text-[#BBAA9F] font-medium">
                    All rights reserved | <span className="text-[#A05236] dark:text-[#C28B6B]">code BPdevelopment</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer