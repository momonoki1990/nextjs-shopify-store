import React from "react";
import { menuIcon, closeIcon } from "components/common/Icon";

type Props = {
  opened: boolean;
  toggleAccordion: (opened: boolean) => void;
};

const MenuButton: React.FC<Props> = ({ opened, toggleAccordion }) => {
  return (
    <>
      {opened ? (
        <button
          className="inline-block md:hidden p-2"
          onClick={() => toggleAccordion(false)}
        >
          {closeIcon}
        </button>
      ) : (
        <button
          className="inline-block md:hidden p-2"
          onClick={() => toggleAccordion(true)}
        >
          {menuIcon}
        </button>
      )}
    </>
  );
};

export default MenuButton;
