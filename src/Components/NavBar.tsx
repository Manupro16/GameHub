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
import React, { useState } from "react";

interface NavBarProps {
    onSearch: (query: string) => void;
}


function NavBar({ onSearch }: NavBarProps) {
    const { colorMode, toggleColorMode } = useColorMode();
    const templateColumns = useBreakpointValue({ base: "1fr", md: "auto 1fr auto" });
    const [searchQuery, setSearchQuery] = useState("");


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("clicked" + event.target.value);
        setSearchQuery(event.target.value);
        onSearch(event.target.value); // Call the callback passed from App
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
