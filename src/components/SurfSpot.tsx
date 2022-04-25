import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import * as React from "react";
import SurfingIcon from "@mui/icons-material/Surfing";

export enum BottomType {
  Sand,
  Reef,
  Stones,
  Mixed,
}

export enum Tide {
  Low = 1,
  Mid = 2,
  High = 4,
}

export interface SurfSpotDto {
  name: string;
  description: string;
  imageUrl: string;
  surfer: string;
}

export interface ISurfSpotProps {
  item: SurfSpotDto;
}

export class SurfSpot extends React.PureComponent<ISurfSpotProps> {
  public render() {
    return (
      <Card sx={{ width: 320, height: 400, margin: 2 }}>
        <CardHeader title={this.props.item.name}></CardHeader>
        <CardMedia
          sx={{ height: "40%" }}
          component="img"
          image={this.props.item.imageUrl}
        ></CardMedia>
        <CardContent sx={{ height: "25%" }}>
          <Typography variant="body2">{this.props.item.description}</Typography>
        </CardContent>
        <CardActions>
          <SurfingIcon />{" "}
          <Typography variant="caption"> {this.props.item.surfer} </Typography>
        </CardActions>
      </Card>
    );
  }
}
