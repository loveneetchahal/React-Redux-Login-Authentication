import { styled } from "@material-ui/core";

export const Heading = styled("h5")({
  color: "#31333F",
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
  textTransform: "uppercase",
});

export const H3 = styled("h3")({
  fontSize: "12px",
  color: "#5F5F5F",
  fontWeight: "bold",
  margin: "4px 0",
});

export const Label = styled("p")({
  color: "#B0BAC9",
  letterSpacing: "1.13px",
  textTransform: "uppercase",
  fontSize: "14px",
  marginBottom: "5px",
  fontWeight: 500,
});

export const Pair = styled("div")({
  // maxWidth: "205px",
});
export const InputPairs = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  // gridTemplateColumns: "0.8fr 1.5fr",
  gridGap: "15px",
});