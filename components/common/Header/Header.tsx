import React from "react";
import SearchDrawer from "components/common/Header/SearchDrawer";
import MenuList from "components/common/Header/MenuList";
import MenuButton from "components/common/Header/MenuButton";
import { bagIcon } from "components/utils/Icon";
import { Collapse } from "@material-ui/core";
import Link from "next/link";

const Header: React.FC = () => {
  const [opened, setOpened] = React.useState(false);

  const toggleAccordion = (opened: boolean) => {
    setOpened(opened);
  };

  return (
    <header className="border-b border-gray-200 header">
      <div className="container flex header__inner items-center justify-between md:grid md:grid-cols-3 xl:max-w-none xl:px-14">
        <div className="mt-3 text-left mb-3 header__logo md:mt-6 md:mb-6 ">
          <Link href="/" passHref>
            <a className="font-semibold text-lg leading-none tracking-widest text-gray-800 md:text-xl hover:text-opacity-70">
              SAMPLE-KUMA-STORE1
            </a>
          </Link>
        </div>

        <MenuList visibility="hidden md:block" />

        <div className="flex header__icons items-center justify-end">
          <SearchDrawer />
          <Link href="/cart" passHref>
            <a className="p-2 text-gray-700 bag inline-block">{bagIcon}</a>
          </Link>
          <MenuButton opened={opened} toggleAccordion={toggleAccordion} />
        </div>
      </div>

      <Collapse in={opened}>
        <MenuList visibility="md:hidden block" />
      </Collapse>
    </header>
  );
};

export default Header;
