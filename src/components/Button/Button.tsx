import React from 'react';
import classes from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button' }) => (
  <button className={classes.Button} onClick={onClick} type={type}>
    {label}
  </button>
);
