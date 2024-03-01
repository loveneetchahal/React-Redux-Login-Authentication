import {
  MenuItem,
  styled,
  InputAdornment,
  IconButton,
  TextFieldProps,
  TextField,
  fade,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { theme } from "../theme/Theme";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import Visibility from "../Assets/visibility.svg";
// import VisibilityOff from "../Assets/visibilityOff.svg";

interface ISelectOptions {
  options?: {
    label: string;
    value: number | string;
  }[];
  themeType?: "blue";
}
const MuiTextField = withStyles(() => ({
  root: {
    wordSpacing: "normal",
    marginTop: 0,
    marginBottom: (props) => (props.size === "small" ? "15px" : "35px"),
    width: "100%",
    background: "transparent",
    textAlign: "left",
    "& .input-label": {
      fontSize: "14px",
      transform: "translate(0px, 0px) scale(1) !important",
      display: "block",
      marginBottom: 13,
      position: "relative",
      "&:not(.Mui-focused)": {
        color: "inherit",
      },
    },

    "& input:-internal-autofill-selected": {
      backgroundColor: "transparent !important",
    },
    "& input:-webkit-autofill": {
      "-webkit-transition-delay": "9999s",
      "-webkit-transition":
        "color 9999s ease-out, background-color 9999s ease-out",
    },
    "& .input-wrap": {
      border: "1px solid",
      borderColor: (props) =>
        props.error
          ? theme.palette.error.main
          : props.themeType === "blue"
          ? "#E0E7FF"
          : fade(theme.palette.grey[300], 0.5),
      background: (props) =>
        props.themeType === "blue" ? "#E0E7FF33" : theme.palette.common.white,
      "&:before, &:after": {
        display: "none",
      },
      borderRadius: "5px",
      "& > input": {
        height: (props) => (props.size === "small" ? "36px" : "60px"),
        padding: (props) =>
          props.size === "small" ? "0px 15px 0px" : "0px 23px 0px",
        boxSizing: "border-box",
        whitespace: "normal",
        color: theme.palette.common.black,
        lineHeight: 1,
        borderRadius: "5px",
        fontSize: theme.typography.fontSize,
        "&:focus": {
          color: theme.palette.common.black,
        },
      },
      "& .MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)": {
        marginTop: 0,
      },
      "& .MuiSelect-selectMenu": {
        whiteSpace: "normal",
      },
      "& .MuiSelect-iconFilled": {
        right: "0px",
      },
      "& .MuiFilledInput-inputAdornedStart": {
        paddingLeft: 0,
      },
    },
    "& .MuiFilledInput-input, & .MuiInputLabel-root": {
      fontSize: theme.typography.fontSize,
    },
    "& .MuiFormHelperText-root": {
      fontSize: "11px",
      margin: "8px 8px 0",
      "&:empty": {
        display: "none",
      },
    },
    "& .input-select": {
      "& > div": {
        height: (props) => (props.size === "small" ? "36px" : "40px"),
        padding: "0px 16px 0px",
        paddingLeft : "8px",
        paddingRight : "20px",
        boxSizing: "border-box",
        color: theme.palette.common.black,
        lineHeight: (props) => (props.size === "small" ? "36px" : "40px"),
        borderRadius: "5px",
        fontSize: theme.typography.fontSize,
        "&:focus": {
          color: theme.palette.common.black,
        },
      },
      "& > svg": {
        // top: " calc(50% - 22px)",
        width: "24px",
      },
    },
  },
}))((props: TextFieldProps & ISelectOptions) => {
  const [showPassword, setShowPassword] = useState(false);
  if (props.select && props.options) {
    return (
      <TextField
        {...props}
        variant="filled"
        InputProps={{ className: "input-wrap input-select" }}
        InputLabelProps={{ className: "input-label", shrink: true }}
        fullWidth={true}
        inputProps={{ displayEmpty: true }}
      >
        <StyledOption value="---" selected={true} disabled={true}>
          ---
        </StyledOption>
        {props.options.map((option) => (
          <StyledOption
            key={`${option.label}-${option.value}`}
            value={option.value}
          >
            {option.label}
          </StyledOption>
        ))}
      </TextField>
    );
  }
  return (
    <TextField
      {...props}
      variant="filled"
      type={showPassword ? "text" : props.type}
      InputProps={{
        ...props.InputProps,
        className: "input-wrap",
        endAdornment:
          props.type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                edge="end"
                className="password-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      InputLabelProps={{ className: "input-label", shrink: true }}
      fullWidth={true}
    />
  );
});

export default React.memo(MuiTextField);

const StyledOption = styled(MenuItem)({
  fontSize: "16px !important",
});
