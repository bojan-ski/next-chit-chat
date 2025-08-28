import { JSX } from "react";

type NoDataMessageProps = {
  message: string;
  headerCss?: string;
}

function NoDataMessage({ message, headerCss }: NoDataMessageProps): JSX.Element {
  return (
    <h2 className={`text-center text-[#7B4B3A] font-semibold text-3xl ${headerCss}`}>
      {message}
    </h2>
  )
}

export default NoDataMessage