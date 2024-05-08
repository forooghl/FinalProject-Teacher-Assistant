import { React } from "react";

const Card = (props) => {
    return (
        <div className="flex flex-col">
            <p className="font-bold text-raisin-black text-lg pr-3 mb-2">
                {props.title}{" "}
                {props.cardType == "practice" ? (
                    <i className="fa fa-pencil text-blue-yonder" aria-hidden="true"></i>
                ) : (
                    <i className="fa fa-graduation-cap text-blue-yonder" aria-hidden="true"></i>
                )}
            </p>
            {props.items.props.children.length < 1 ? (
                <div className="border-solid border border-rich-black-fogra-29/10 py-2 text-center shadow rounded-md max-md:mb-8">
                    چیزی برای نمایش وجود ندارد
                </div>
            ) : (
                <div className="border-solid border border-rich-black-fogra-29/10 shadow rounded-md max-md:mb-8">
                    {props.items}
                </div>
            )}
        </div>
    );
};
export default Card;
