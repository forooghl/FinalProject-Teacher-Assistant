import { React } from "react";

const Card = (props) => {
    return (
        <div className="flex flex-col w-2/5 max-md:w-10/12">
            <p className="font-bold text-raisin-black text-lg pr-3 mb-2">{props.title}</p>
            <div className="border-solid border border-rich-black-fogra-29/10 shadow rounded-md max-md:mb-8">{props.courses}</div>
        </div>
    );
};
export default Card;
