import { IconButton, Snackbar } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export interface INotificationProps {
  message: string;
}

export function Notification(props: INotificationProps) {
  const [open, setOpen] = useState(true);
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(_) => setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={(_) => setOpen(false)}
      message={props.message}
      action={action}
    />
  );
}
