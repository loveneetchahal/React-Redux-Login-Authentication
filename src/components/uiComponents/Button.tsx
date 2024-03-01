import { styled, ButtonProps, Button } from "@material-ui/core";
import React from "react";
import { color } from "../theme/Color";

export const MuiButton = styled(({ ...other }: ButtonProps) => <Button {...other} />)({
  padding: (props: ButtonProps) =>
    props.variant && props.variant !== "text"
      ? props.size === "small"
        ? "5px 30px"
        : "10px 30px"
      : "4px 5px",
  fontWeight: 500,
  fontSize: "inherit",
  textTransform: "inherit",
  boxShadow: "none !important",
  minWidth: (props: ButtonProps) => (props.variant && props.variant !== "text" ? "150px" : "50px"),
  border: (props: ButtonProps) =>
    props.variant && props.variant !== "text"
      ? `2px solid ${
          props.color === "primary"
            ? color.primary
            : props.color === "secondary"
            ? color.secondary
            : "currentColor"
        } !important`
      : "0",
  color: (props: ButtonProps) =>
    props.variant && props.variant !== "text"
      ? props.color === "primary"
        ? "#fff"
        : "#787B7E"
      : "currentColor",
});

export const BtnGroup = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  "& button": {
    marginLeft: "20px",
  },
});
