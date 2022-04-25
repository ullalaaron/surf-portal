import { Grid } from "@mui/material";
import * as React from "react";

export interface INavbarProps {}

export default class Navbar extends React.PureComponent<INavbarProps> {
  public render() {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}></Grid>
      </Grid>
    );
  }
}
