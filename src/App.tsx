import {Box, Grid, useBreakpointValue} from '@chakra-ui/react';
import NavBar from "./Components/NavBar.tsx";
import GenresList from "./Components/GenresList.tsx";
import GamesList from "./Components/GamesList.tsx";
import  { useState } from 'react';
import Dropdowns from "./Components/Dropdowns.tsx";


function App() {

    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState("");

    function handleGenreSelect(genre: string ) {
        setSelectedGenre(genre);
    }

    function handlePlatformSelect(platform: string) {
        setSelectedPlatform(platform);
    }

    function handleSortSelect(sortOption: string) {
        setSortOption(sortOption);
    }

    const templateColumns = useBreakpointValue({
        base: "1fr", // Stacks the grid items on smaller screens
        md: "0.3fr 1.5fr", // Allocates more space to the games section on wider screens
    });

    const gridTemplateAreas = useBreakpointValue({
        base: `
            "dropdowns"
            "genres"
            "games"`,
        md: `"genres dropdowns" "genres games"`
    });

    const gridTemplateRows = useBreakpointValue({
        base: "auto auto 1fr",
        md: "auto 1fr"
    });

  return (
      <>
        <NavBar onSearch={setSearchQuery} />
        <Grid gridTemplateAreas={gridTemplateAreas} templateRows={gridTemplateRows} templateColumns={templateColumns} gap={6} padding={6}>
            <Box gridArea='dropdowns'>
                <Dropdowns onPlatformSelect={handlePlatformSelect} onSortSelect={handleSortSelect} />
            </Box>
            <Box gridArea='genres'>
                <GenresList onGenreSelect={handleGenreSelect} />
            </Box>
            <Box gridArea='games'>
                <GamesList selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} sortOption={sortOption}  searchQuery={searchQuery} />
            </Box>

        </Grid>
      </>
  );
}

export default App;



// Good afternoon ready to finish this project?
//
//     Today, we will work on 4 things.
//
// 1 when a genre gets clicked, it will display the genre that got clicked. For example, if the user clicks on the action, it will filter all games and display only the games that are action, and so on
//
// 2 add functionality to the search bar. If a user searches for a game, it will display that game. If no games are found, it will display a message
//
// 3 add functionality to the dropdown menus. If a user clicks on Date it will display the game with the newest Date to the oldest Date, and the same thing goes for the platform dropdown menu
//
// 4 add a loading animation to the skeleton of the card when loading. For example, if a user clicks on a query action like selecting only actions games, it will display a loading animation on the skeleton of the card, and once the process is done, it will display data