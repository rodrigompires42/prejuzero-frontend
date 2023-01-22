import { Container, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Container
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default Loading;
