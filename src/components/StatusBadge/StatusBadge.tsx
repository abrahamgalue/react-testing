import React from "react";
import classes from "./StatusBadge.module.scss";

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`${classes.StatusBadge} ${classes[`StatusBadge--${status}`]}`}
  >
    {status.toUpperCase()}
  </span>
);
