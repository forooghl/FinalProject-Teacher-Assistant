import { React } from "react";

const Card = (props) => {
    let empty;
    if (props.title == "کلاس های درس") {
        if (props.items.props.children[0].length == 0 && props.items.props.children[1].length == 0) {
            empty = 0;
        } else {
            empty = props.items.props.children[0].length + props.items.props.children[1].length;
        }
    } else {
        empty = props.items.props.children.length;
    }
    return (
        <div className="flex flex-col">
            <p className="font-bold text-raisin-black text-lg pr-3 mb-2">
                {props.title}{" "}
                {props.cardType == "practice" ? (
                    <i className="fa fa-pencil text-blue-yonder" aria-hidden="true"></i>
                ) : props.cardType == "evaluation" ? (
                    <i className="fa-solid fa-check-double text-blue-yonder" aria-hidden="true"></i>
                ) : (
                    <i className="fa fa-graduation-cap text-blue-yonder" aria-hidden="true"></i>
                )}
            </p>
            {empty < 1 ? (
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
