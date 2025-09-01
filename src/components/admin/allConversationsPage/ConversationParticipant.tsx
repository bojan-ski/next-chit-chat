import { JSX } from "react";

type ConversationParticipantProps = {
    username: string;
    reverse?: boolean;
};

function ConversationParticipant({ username, reverse }: ConversationParticipantProps): JSX.Element {
    return (
        <div className={`flex items-center gap-2 ${reverse ? "flex-row-reverse" : ""}`}>
            {/* avatar */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-white font-bold">
                {username.charAt(0).toUpperCase()}
            </div>

            {/* username */}
            <p className="font-semibold text-[#7B4B3A]">{username}</p>
        </div>
    );
}

export default ConversationParticipant