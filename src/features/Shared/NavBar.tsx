/**
 * NavBar Component
 *
 * Purpose:
 * Renders the navigation bar for the application. It includes a logo, a search bar, and a toggle button for dark mode.
 *
 * Props:
 * - `onSearch`: Function that handles the search query input. It is triggered on search input change.
 *
 * Usage:
 * This component is used at the top of the main application layout. It allows users to search for games and toggle the color mode of the application.
 *
 * Search Functionality:
 * The search bar updates the state on each input change and calls the `onSearch` function, allowing the parent component to handle the search logic.
 *
 * Color Mode Toggle:
 * Includes a button to toggle between light and dark modes of the application, enhancing the user experience and accessibility.
 *
 * Responsiveness:
 * The component uses `useBreakpointValue` from Chakra UI for responsive layout design, ensuring it adapts well to various screen sizes.
 *
 * Accessibility:
 * Semantic HTML is used along with proper ARIA labels for accessibility. The search bar and toggle button are keyboard accessible.
 */
import {
    Grid,
    Image,
    InputGroup,
    InputLeftElement,
    Input,
    useColorMode,
    IconButton,
    useBreakpointValue
} from '@chakra-ui/react';
import { SearchIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from "react";
import { useGamesStore } from "../Game";




function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const templateColumns = useBreakpointValue({ base: "1fr", md: "auto 1fr auto" });
    const { setSearchQuery, searchQuery, updateFilteredSortedGames } = useGamesStore()


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        updateFilteredSortedGames()
    };

    return (
        <Grid templateColumns={templateColumns} gap={4} alignItems="center" padding={4}>
            {/* Logo */}
            <Image src='/assets/gamehub.png' boxSize={['40px', '50px', '60px']} objectFit='cover' alt='Web-Logo' />

            {/* Search Bar */}
            <InputGroup size='md'>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input placeholder="Search games" value={searchQuery} onChange={handleSearchChange} />
            </InputGroup>

            {/* Toggle Button */}
            <IconButton
                aria-label="Toggle dark mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
            />
        </Grid>
    );
}

export default NavBar;
