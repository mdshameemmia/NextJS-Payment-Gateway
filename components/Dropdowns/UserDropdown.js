import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";

const UserDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    async function getUserInfo() {
      const user = await axios.post(`/api/user/info`, session);
      const profile = "/images/" + user?.data?.profile;
      setProfile(profile);
    }
    getUserInfo();
  }, [session]);

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            {
              <Image
                alt="..."
                className="w-full rounded-full align-middle border-none shadow-lg"
                src={profile??"/img/user.jpg"}
                width={50}
                height={50}
              />
            }
          </span>
        </div>
      </a>
    </>
  );
};

export default UserDropdown;
