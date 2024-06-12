'use client'
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Collapse,
} from "@mui/material";

const CollapseCheckbox = ({ initState, title, list, handleFilters }) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (initState) {
      setOpen(initState);
    }
  }, [initState]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAngle = () =>
    open ? (
      <i className="fas fa-angle-up"></i>
    ) : (
      <i className="fas fa-angle-down"></i>
    );

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    handleFilters(newChecked);
    setChecked(newChecked);
  };

  const renderList = () =>
    list
      ? list.map((value, index) => (
          <ListItem key={index} style={{ padding: "10px 0" }}>
            <ListItemText primary={value} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  return (
    <div>
      <List style={{ borderBottom: "1px solid #dbdbdb" }}>
        <ListItem onClick={handleClick} style={{ padding: "10px 23px 10px 0" }}>
          <ListItemText
            primary={title}
            style={{ color: "#4bbf73", fontWeight: "bold" }}
          />
          {handleAngle()}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderList()}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default CollapseCheckbox;
