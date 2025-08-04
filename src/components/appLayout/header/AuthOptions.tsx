import { JSX } from "react";
import AuthButton from "./AuthButton";

function AuthOptions(): JSX.Element {
    return (
        <div className="flex space-x-4">
            {/* sign up */}
            <AuthButton
                href='/signup'
                label='sign up'
            />

            {/* sign in */}
            <AuthButton
                href='/signin'
                label='sign in'
            />
        </div>
    )
}

export default AuthOptions