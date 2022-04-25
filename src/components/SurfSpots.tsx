import { SurfSpotDto, SurfSpot } from "./SurfSpot";
import { getSurfSpotsSelector } from "../slices/SurfSpots.slice";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";

export interface ISurfSpotsProps {}

export function SurfSpots(props: ISurfSpotsProps) {
  const items = useSelector(getSurfSpotsSelector);
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {items.map((item: SurfSpotDto, index: number) => (
        <SurfSpot key={index} item={item} />
      ))}
    </Container>
  );
}
