import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { uploadFile } from "../external/Firebase";
import { setLoading } from "../slices/Loading.slice";
import { setNotification } from "../slices/Notification.slice";
import { addSurfSpot } from "../slices/SurfSpots.slice";
import { useAppDispatch } from "../store/store.hooks";
import { SurfSpotDto } from "./SurfSpot";
export interface ISurfSpotFormProps {
  onClose?: (item: SurfSpotDto) => void;
  open: boolean;
  surfSpot?: SurfSpotDto;
  submitterAddress: string;
}
export default function SurfSpotForm(props: ISurfSpotFormProps) {
  const [open, setOpen] = useState(props.open ?? true);
  useEffect(() => {
    setOpen(props?.open ?? true);
  }, [props?.open]);

  const Input = styled("input")({
    display: "none",
  });

  const [spot, setSurfSpot] = useState<SurfSpotDto>(
    props?.surfSpot ?? {
      name: "",
      description: "",
      imageUrl: "",
      surfer: "",
    }
  );

  const [image, setImage] = useState<string>();
  const [imageFile, setImageFile] = useState<File>();

  const dispatch = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (!e.target?.files) {
      return;
    }
    let url = URL.createObjectURL(e.target.files[0]);
    setImage(url);
    setImageFile(e.target.files[0]);
  }

  async function handleSubmit(e: React.SyntheticEvent): Promise<void> {
    console.log("Submitting", spot);
    dispatch(setLoading(true));
    const fileUrl = await handleUpload();
    spot.imageUrl = fileUrl;
    spot.surfer = props.submitterAddress;
    dispatch(addSurfSpot(spot));
    dispatch(setNotification("Surf Spot Added"));
    dispatch(setLoading(false));
    if (props.onClose) {
      props.onClose.call(null, spot);
    }
    setOpen(false);
  }

  async function handleUpload(): Promise<string> {
    console.log("Uploading");
    const fileName = `${spot.name.replaceAll(" ", "")}.${
      imageFile?.type.split("/")[1]
    }`;
    const fileUrl = await uploadFile(imageFile!, fileName);
    return fileUrl;
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Add Surf Spot</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Surf Spot Name"
            type="text"
            fullWidth
            value={spot.name}
            onChange={(e) => setSurfSpot({ ...spot, name: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Surf Spot Description"
            multiline
            fullWidth
            value={spot.description}
            onChange={(e) =>
              setSurfSpot({ ...spot, description: e.target.value })
            }
          />
          <label htmlFor="contained-button-file">
            <Input
              id="contained-button-file"
              type="file"
              onChange={handleChange}
            />
            <Button component="span">Choose Spot Picture</Button>
          </label>
          {image && image.length > 0 && (
            <Card sx={{ mt: 1, mb: 1 }}>
              <CardActionArea>
                <CardMedia component="img" image={image} />
              </CardActionArea>
            </Card>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={(e) => setOpen(false)}>
          CLOSE
        </Button>
        <Button
          variant="contained"
          disabled={
            !spot.name.length || !spot.description.length || !image?.length
          }
          type="submit"
          onClick={handleSubmit}
        >
          Submit Surf Spot
        </Button>
      </DialogActions>
    </Dialog>
  );
}
