import React, { ReactElement } from "react";
import { useRouter } from "next/router";

interface Props {
  className: string;
  text: string;
  onClick: () => void;
  htmlType: "button" | "submit" | "reset" | undefined;
}

function PositiveButton(props: Props): ReactElement {
  const { onClick, text, className, htmlType } = props;
  const router = useRouter();
  const handleClick = () => {
    onClick();
  };
  const componentClassName = `${className} tw-rounded-full tw-bg-dark-green tw-p-5 tw-text-white tw-min-w-3/5 md:tw-min-w-2/5 tw-text-2xl`;

  return (
    <button
      onClick={handleClick}
      className={componentClassName}
      type={htmlType}
    >
      {text}
    </button>
  );
}

PositiveButton.defaultProps = {
  className: "",
  text: "",
  htmlType: "button",
};

export default PositiveButton;
