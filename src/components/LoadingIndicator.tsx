import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export interface ILoadingIndicatorProps {}

export class LoadingIndicator extends React.PureComponent<ILoadingIndicatorProps> {
  public render() {
    let open = true;
    const handleClose = () => {
      open = false;
    };
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}
