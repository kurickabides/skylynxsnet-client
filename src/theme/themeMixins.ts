// theme/themeMixins.ts
import { CSSObject } from "@mui/material/styles";

const toolbarMixin: CSSObject = {
  minHeight: 64,
  "@media (min-width:0px)": {
    "@media (orientation: landscape)": {
      minHeight: 56,
    },
  },
  "@media (min-width:600px)": {
    minHeight: 64,
  },
};

const ContainerMixins = {
  theme: { spacing: 2 },
  footer: {
    height: 30,
    width: 0,
  },
  header: {
    height: 60,
    width: 0,
  },
  Card: {
    height: 440,
    width: 440,
  },
  drawer: {
    open: {
      height: 0,
      width: 250,
    },
    closed: {
      height: 0,
      width: 75,
    },
  },
  page: {
    height: 0,
    width: 500,
  },
  sketch: {
    height: 300,
    width: 500,
  },
  icons: {
    height: 50,
    width: 50,
  },
  errorWindow: {
    top: "30vh",
    left: "15rem",
    width: "30rem",
  },
  toolbar: toolbarMixin,
};

export default ContainerMixins;
