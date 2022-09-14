import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { logout } from "../../shared/utils/auth";
import { setAudiOnly } from "../../store/actions/roomActions";
import { useDispatch, useSelector } from "react-redux";

const BasicMenu = () => {
  const dispatch = useDispatch();
  const audioOnly = useSelector((state) => state.room.audioOnly);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAudioOnlyChnage = () => {
    dispatch(setAudiOnly(!audioOnly));
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen} style={{ color: "white" }}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
        <MenuItem onClick={handleAudioOnlyChnage}>
          {audioOnly ? "Audio only Enabled" : "Audio only disabled"}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;
