import React from 'react'
import { menuIcon } from "components/common/Icon";

type Props = {
  toggleAccordion: () => void
}

const MenuButton: React.FC<Props> = ({ toggleAccordion }) => {
  return (
    <button className="inline-block md:hidden p-2" onClick={toggleAccordion}>
      {menuIcon}
    </button>
  );
};

export default MenuButton;
