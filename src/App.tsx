/**
 * App.js
 *
 * The main component of the application. It serves as the root of the component
 * hierarchy and manages the global state and layout of the application.
 *
 * State:
 * - selectedGenre: Stores the currently selected genre from the genre list.
 * - selectedPlatform: Stores the currently selected platform from the dropdown.
 * - sortOption: Stores the selected sorting option for the games list.
 * - searchQuery: Stores the current search query from the search bar.
 *
 * Functions:
 * - handleGenreSelect: Updates the `selectedGenre` state based on user selection.
 * - handlePlatformSelect: Updates the `selectedPlatform` state based on user selection.
 * - handleSortSelect: Updates the `sortOption` state based on user selection.
 * - setSearchQuery: Updates the `searchQuery` state with the search input.
 *
 * Layout:
 * - Utilizes Chakra UI's Grid component to create a responsive layout.
 * - Divided into three main areas: dropdowns, genres, and games.
 * - Adapts the layout based on screen size using `useBreakpointValue`.
 *
 * Children Components:
 * - NavBar: Component that contains the navigation and search functionality.
 * - GenresList: Component that displays a list of game genres.
 * - GamesList: Component that displays a list of games based on selected filters and search query.
 * - Dropdowns: Component that contains dropdown menus for platform selection and sorting options.
 */


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



