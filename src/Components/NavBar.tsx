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

function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const templateColumns = useBreakpointValue({ base: "1fr", md: "auto 1fr auto" });


    return (
        <Grid templateColumns={templateColumns} gap={4} alignItems="center" padding={4}>
            {/* Logo */}
            <Image src='/assets/gamehub.png' boxSize={['40px', '50px', '60px']} objectFit='cover' alt='Web-Logo' />

            {/* Search Bar */}
            <InputGroup size='md'>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input placeholder="Search games" />
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
