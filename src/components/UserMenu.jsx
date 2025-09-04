import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { user } = useSelector((state) => state.auth);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {};

  return (
    <div className="relative z-20">
      <div
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar alt="Menu" src="" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
            sx: { width: 160 },
          },
        }}
      >
        <Link to="/profile">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <BiUser className="text-xl" />
            <span className="font-bold text-[16px] mt-1">{user?.username}</span>
          </MenuItem>
        </Link>
        <Link to="/profile/orders">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <FaShoppingCart className="text-xl" />
            <span className="font-semibold text-[16px] mt-1">Order</span>
          </MenuItem>
        </Link>
        <MenuItem className="flex gap-2" onClick={logOutHandler}>
          <div className="font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1"></div>
          <IoExitOutline className="text-xl" />
          <span className="font-bold text-[16px] mt-1">Log Out</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
