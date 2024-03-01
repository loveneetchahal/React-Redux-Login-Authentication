import { withStyles } from "@material-ui/core";
import { theme } from "./Theme";

export const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  "@global": {
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
    html: {
      "-webkit-text-size-adjust": "100%",
      "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
    },
    "article, aside, figcaption, figure, footer, header, hgroup, main, nav, section": {
      display: "block",
    },
    body: {
      margin: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeightRegular,
      lineHeight: 1.5,
      color: theme.palette.common.black,
    },
    "[tabindex='-1']:focus:not(:focus-visible)": {
      outline: " 0 !important",
    },
    hr: {
      boxSizing: "content-box",
      height: 0,
      overflow: "visible",
      marginTop: "1rem",
      marginBottom: "1rem",
      border: 0,
      bordertop: `1px solid ${theme.palette.divider}`,
    },
    "h1, h2, h3, h4, h5, h6": {
      marginTop: 0,
      marginBottom: "0.5rem",
      color: theme.palette.text.primary,
    },
    p: {
      marginTop: 0,
      marginBottom: "1rem",
    },
    "abbr[title], abbr[data-original-title]": {
      textDecoration: "underline",
      "-webkit-text-decoration": "underline dotted",
      "text-decoration": "underline dotted",
      cursor: "help",
      borderBottom: 0,
      "-webkit-text-decoration-skip-ink": "none",
      textDecorationSkipInk: "none",
    },
    address: {
      marginBottom: "1rem",
      fontStyle: "normal",
      lineHeight: "inherit",
    },
    "ol, ul, dl": {
      marginTop: 0,
      marginBottom: "1rem",
    },
    "ol ol, ul ul, ol ul, ul ol": {
      marginBottom: 0,
    },
    dt: {
      fontEeight: 700,
    },
    dd: {
      marginBottom: "0.5rem",
      marginLeft: 0,
    },
    blockquote: {
      margin: "0 0 1rem",
    },
    "b, strong": {
      fontWeight: theme.typography.fontWeightBold,
    },
    small: {
      fontSize: "80%",
    },
    "sub, sup": {
      position: "relative",
      fontSize: "75%",
      lineHeight: 0,
      verticalAlign: "baseline",
    },
    sub: {
      bottom: "-0.25em",
    },
    sup: {
      top: "-0.5em",
    },
    a: {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
    "a:hover": {
      color: theme.palette.primary.light,
      textDecoration: "underline",
    },
    "a:not([href])": {
      color: "inherit",
      textDecoration: "none",
    },
    "a:not([href]):hover": {
      color: "inherit",
      textDecoration: "none",
    },
    "pre, code, kbd, samp": {
      fontFamily: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
        "Courier New", monospace`,
      fontSize: "1em",
    },
    pre: {
      marginTop: 0,
      marginBottom: "1rem",
      overflow: "auto",
      display: "block",
      fontSize: "87.5%",
      color: theme.palette.primary,
    },
    figure: {
      margin: "0 0 1rem",
    },
    img: {
      verticalAlign: "middle",
      borderStyle: "none",
      maxWidth: "100%",
      height: "auto",
    },
    svg: {
      overflow: "hidden",
      verticalAlign: "middle",
    },
    fieldset: {
      minWidth: 0,
      padding: 0,
      margin: 0,
      border: 0,
    },
    legend: {
      display: "block",
      width: "100%",
      maxWidth: "100%",
      padding: 0,
      marginBottom: "0.5rem",
      fontSize: "1.5rem",
      lineHeight: "inherit",
      color: "inherit",
      whiteSpace: "normal",
    },
    progress: {
      verticalAlign: "baseline",
    },
    output: {
      display: "inline-block",
    },
    summary: {
      display: "list-item",
      cursor: "pointer",
    },
    template: {
      display: "none",
    },
    "[hidden]": {
      display: "none !important",
    },
    "h1,h2,h3,h4,h5,h6": {
      marginBottom: "0.5rem",
      fontWeight: theme.typography.fontWeightMedium,
      lineHeight: 1.2,
    },
    h1: {
      ...theme.typography.h1,
    },
    h2: {
      ...theme.typography.h2,
    },
    h3: {
      ...theme.typography.h3,
    },
    h4: {
      ...theme.typography.h4,
    },
    h5: {
      ...theme.typography.h5,
    },
    h6: {
      ...theme.typography.h6,
    },
    "small, .small": {
      fontSize: "80%",
      fontWeight: 400,
    },
    "mark, .mark": {
      padding: "0.2em",
      backgroundColor: "#fcf8e3",
    },
    code: {
      fontSize: "87.5%",
      color: theme.palette.grey[300],
      wordWrap: "break-word",
    },
    "a > code": {
      color: "inherit",
    },
    kbd: {
      padding: "0.2rem 0.4rem",
      fontSize: "87.5%",
      color: "#fff",
      backgroundColor: theme.palette.primary,
      borderRadius: "0.2rem",
    },
    "kbd kbd": {
      padding: 0,
      fontSize: "100%",
      fontWeight: theme.typography.fontWeightBold,
    },
    "pre code": {
      fontSize: "inherit",
      color: "inherit",
      wordBreak: "normal",
    },
  },
})(() => null);
