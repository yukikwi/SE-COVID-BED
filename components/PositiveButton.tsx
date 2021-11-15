import React, { ReactElement } from "react";

interface Props {
  id: string;
  className: string;
  text: string;
  onClick: () => void;
  htmlType: "button" | "submit" | "reset" | undefined;
}

PositiveButton.defaultProps = {
  className: "",
  text: "",
  htmlType: "button",
};

function PositiveButton(props: Props): ReactElement {
  const { id, onClick, text, className, htmlType } = props;

  // merge custom class with button class
  const componentClassName = `${className} tw-rounded-full tw-bg-dark-green tw-p-5 tw-text-white tw-min-w-3/5 md:tw-min-w-2/5 tw-text-2xl`;

  return (
    <button
      id={id}
      onClick={onClick}
      className={componentClassName}
      type={htmlType}
    >
      {text}
    </button>
  );
}

export default PositiveButton;
