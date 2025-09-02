import { JSX } from 'react'
import FeatureCard from './FeatureCard'

function FeaturesSection(): JSX.Element {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 text-center">

                <h2 className="text-3xl font-bold text-gray-800 mb-10">
                    Features You&apos;ll Love
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        label='Private Conversations'
                        text='Connect with members directly and enjoy meaningful 1-on-1 conversations.'
                    />

                    <FeatureCard
                        label='Image Upload'
                        text='Share your favorite photos and make your chats more fun and personal.'
                    />

                    <FeatureCard
                        label='Secure & Private'
                        text='Your conversations are encrypted and safe with us.'
                    />
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection