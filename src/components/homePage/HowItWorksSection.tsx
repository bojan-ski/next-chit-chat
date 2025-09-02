import { JSX } from 'react'
import HowItWorksCard from './HowItWorksCard';
import { FaUser, FaCommentDots, FaUsers  } from "react-icons/fa";

function HowItWorksSection(): JSX.Element {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 text-center">

                <h2 className="text-3xl font-bold text-gray-800 mb-10">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    <HowItWorksCard
                        divCss={'animate-fadeIn flex flex-col items-center'}
                        icon={<FaUser />}
                        title={'Sign Up'}
                        description={'Create your free account in seconds.'}
                    />

                    <HowItWorksCard
                        divCss={'animate-fadeIn delay-200 flex flex-col items-center'}
                        icon={<FaCommentDots />}
                        title={'Start Chatting'}
                        description={'Chat with other members in real-time.'}
                    />

                    <HowItWorksCard
                        divCss={'animate-fadeIn delay-400 flex flex-col items-center'}
                        icon={<FaUsers  />}
                        title={'Make Connections'}
                        description={'Build friendships and connect with people worldwide.'}
                    />
                </div>
            </div>
        </section>
    )
}

export default HowItWorksSection