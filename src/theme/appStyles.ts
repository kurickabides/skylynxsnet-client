import { styled } from "@mui/material/styles";
import layoutMixins from "./themeMixins";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Container,
  List,
  IconButton,
  AppBar,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { mixin } from "lodash-es";

// ✅ Reusable row layout with space-between alignment
export const FlexRowBetween = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));
export const FlexCenterRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const PaperContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(layoutMixins.theme.spacing),
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
}));

export const ContentWrapper = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(layoutMixins.theme.spacing),
}));

// Optional: if you need a fixed height card later
export const FixedHeightCard = styled("div")(({ theme }) => ({
  height: 440,
}));

//Page Title
export const PageTitleText = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
}));

//Forms
export const FormRoot = styled("form")(({ theme }) => ({
  margin: "3rem auto",
  width: "95%",
  maxWidth: "25rem",
  borderRadius: "6px",
  padding: "1rem",
  textAlign: "left",
}));

export const Control = styled(CardContent)(({ theme }) => ({
  marginBottom: "0.5rem",
}));

export const Label = styled("label")(({ theme }) => ({
  display: "block",
  color: theme.palette.text.secondary,
  fontWeight: "bold",
  marginBottom: "0.5rem",
}));

export const Input = styled("input")(({ theme }) => ({
  borderRadius: "4px",
  width: "100%",
  textAlign: "left",
  padding: theme.spacing(2),
}));

export const Textbox = styled("input")(({ theme }) => ({
  fontSize: "32px",
  padding: "2px",
  width: "64px",
  textAlign: "center",
  marginRight: "4px",
}));

export const Actions = styled(CardActions)(({ theme }) => ({
  marginTop: "1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

//Button Styles

export const ToggleButton = styled("button")(({ theme }) => ({
  marginTop: "1rem",
  backgroundColor: "transparent",
  color: theme.palette.primary.contrastText,
  border: "none",
  padding: theme.spacing(1),
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
  marginleft: layoutMixins.drawer.closed.width,
  marginRight: theme.spacing(7), // equivalent to 36px
  display: "inline-flex",
  color: theme.palette.primary.contrastText,
}));

export const NumberButton = styled("button")(({ theme }) => ({
  appearance: "none",
  background: "none",
  fontSize: "32px",
  padding: "0 12px 4px",
  outline: "none",
  border: `2px solid transparent`,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.light,
  borderRadius: "2px",
  cursor: "pointer",
  transition: "all 0.15s ease-in-out",
  "&:hover, &:focus": {
    borderColor: theme.palette.primary.dark,
  },
  "&:active": {
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

//Content styles

export const CardRoot = styled("div")(({ theme }) => ({
  margin: theme.spacing(4),
  width: layoutMixins.page.width,
  flexDirection: "column",
  maxWidth: "25rem",
  borderRadius: "6px",
  boxShadow: `0 0 3px ${theme.palette.primary.main}, 0 0 9px ${theme.palette.primary.main}, 0 0 11px ${theme.palette.primary.main}, 0 0 30px ${theme.palette.primary.main}`,
  padding: theme.spacing(1),
  textAlign: "left",
  display: "flex",
}));

export const SectionDivider = styled("hr")(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  border: 0,
  height: "1px",
  backgroundColor: theme.palette.divider,
}));



export const MenuSelected = styled(IconButton)(({ theme }) => ({
  transition: "box-shadow",
  transitionDuration: "1s",
  boxShadow: `0 0 3px ${theme.palette.primary.main}, 
              0 0 9px ${theme.palette.primary.main}, 
              0 0 11px ${theme.palette.primary.main}, 
              0 0 30px ${theme.palette.primary.main}`,
}));

export const IndentedItem = styled(ListItem)(({ theme }) => ({
  marginLeft: theme.spacing(layoutMixins.theme.spacing),
}));

export const SectionTitle = styled("h2")(({ theme }) => ({
  width: "100%",
  textAlign: "left",
  padding: theme.spacing(layoutMixins.theme.spacing),
}));

export const ParagraphText = styled("p")(({ theme }) => ({
  marginTop: theme.spacing(layoutMixins.theme.spacing),
  backgroundColor: "transparent",
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1),
}));

//Icon Styles
export const CenteredMedia = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const IconWrapper = styled("div")(({ theme }) => ({
  height: layoutMixins.icons.height,
  width: layoutMixins.icons.width,
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&.disabled": {
    pointerEvents: "none",
    opacity: 0.5,
  },
}));
export const IconImageFull = styled("img")(({ theme }) => ({
  height: "100%",
  width: "100%",
}));

export const HeaderAppBar = styled(AppBar)(({ theme }) => ({
  height: theme.mixins.toolbar.minHeight,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const HeaderAppBarShift = styled(AppBar)(({ theme }) => ({
  height: theme.mixins.toolbar.minHeight,
  marginLeft: `${layoutMixins.drawer.open.width}px`,
  width: `calc(100% - ${layoutMixins.drawer.open.width}px)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

export const HeaderTitle = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

//Footer Section
export const FooterRoot = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  background: theme.palette.background.paper,
  minHeight: layoutMixins.footer.height,
}));
//List



export const IndentedList = styled(List)(({ theme }) => ({
  marginLeft: theme.spacing(layoutMixins.theme.spacing),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    transition: "background-color 0.3s ease",
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 36,
  color: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "box-shadow 0.3s ease",

  // Target hover effect through parent ListItem hover
  [`${StyledListItem}:hover &`]: {
    boxShadow: `0 0 6px ${theme.palette.primary.main}, 
                0 0 12px ${theme.palette.primary.light}`,
    borderRadius: "50%",
  },
}));

export const StyledListItemText = styled(ListItemText)(() => ({
  marginLeft: 0,
}));
