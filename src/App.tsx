import {Grid, useBreakpointValue} from '@chakra-ui/react';
import NavBar from "./Components/NavBar.tsx";
import GenresList from "./Components/GenresList.tsx";
import GamesList from "./Components/GamesList.tsx";

function App() {

    const templateColumns = useBreakpointValue({
        base: "1fr", // Stacks the grid items on smaller screens
        md: "0.3fr 1.5fr", // Allocates more space to the games section on wider screens
    });

  return (
      <>
        <NavBar />
        <Grid templateRows='auto' templateColumns={templateColumns} gap={6} padding={6}>
            <GenresList />
            <GamesList />
        </Grid>
      </>
  );
}

export default App;