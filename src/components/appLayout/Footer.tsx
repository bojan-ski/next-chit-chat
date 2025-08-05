import { JSX } from "react";

function Footer(): JSX.Element {
    return (
        <footer className="bg-[#FDF6F0] border-t border-[#E5C6AC] py-4 shadow-sm">
            <div className="text-center text-sm space-y-1 max-w-xl mx-auto px-4">
                <p className="font-semibold text-[#7B4B3A] text-lg tracking-wide">
                    &copy; 2025 <span className="text-[#C05C41]">Chit Chat</span>
                </p>
                <p className="text-[#A3776E] font-medium">
                    All rights reserved | <span className="text-[#A05236]">code BPdevelopment</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer