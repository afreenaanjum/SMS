const styles = (theme) => ({
  notchedOutlineSelect: {
    borderColor: "#E45FFF !important",
  },
  button: {
    backgroundColor: "#7303c0",
    color: "white",
    marginTop: "10px",
    marginBottom: "10px",
  },
  gridPic: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      opacity: "18%",
    },
  },
  textField: {
    marginTop: "12px",
  },
  signInForm: {
    paddingTop: "78px",
    paddingBottom: "78px",
  },
});
export default styles;
