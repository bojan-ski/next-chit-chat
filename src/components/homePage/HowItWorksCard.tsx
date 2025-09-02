import { JSX, ReactNode } from "react";

type HowItWorksCardProps = {
    divCss: string;
    icon: ReactNode;
    title: string;
    description: string;
};

function HowItWorksCard({ divCss, icon, title, description }: HowItWorksCardProps): JSX.Element {
    return (
        <div className={divCss} >
            <div className="text-5xl mb-4 text-[#C05C41]">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">
                {title}
            </h3>
            <p className="text-gray-600">
                {description}
            </p>
        </div>
    );
}

export default HowItWorksCard