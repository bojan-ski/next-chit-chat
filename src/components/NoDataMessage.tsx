import { JSX } from "react";

function NoDataMessage({message}:{message:string}): JSX.Element {
  return (
    <h2 className="text-center font-semibold text-2xl">
       {message} 
    </h2>
  )
}

export default NoDataMessage