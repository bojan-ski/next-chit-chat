import React, { JSX } from 'react'

type FeatureCardProps = {
    label: string;
    text: string;
}

function FeatureCard({ label, text }: FeatureCardProps): JSX.Element {
    return (
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition animate-slideUp border border-transparent hover:border hover:border-[#C05C41]">
            <h3 className="text-xl font-semibold mb-2">
                {label}
            </h3>
            <p className="text-gray-600">
                {text}
            </p>
        </div>
    )
}

export default FeatureCard