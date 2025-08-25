import { JSX, ReactNode } from 'react';

type MemberDataWrapperProps = {
    label: string;
    wrapperCss: string;
    children: ReactNode;
}

function MemberDataWrapper({ label, wrapperCss, children }: MemberDataWrapperProps): JSX.Element {
    return (
        <section className='reported-member-data mb-10'>
            <h2 className="mb-5 text-center lg:text-start font-bold text-3xl text-[#7B4B3A]">
                {label}
            </h2>

            <div className={wrapperCss}>
                {children}
            </div>
        </section>
    )
}

export default MemberDataWrapper