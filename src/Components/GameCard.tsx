/**
 * GameCard Component
 *
 * The GameCard component is used to display information about a specific game.
 * It shows the game's image, name, score, and the platforms it is available on.
 *
 * Props:
 *  - img_url: string - URL of the game's image.
 *  - game_name: string - Name of the game.
 *  - score: number - Metacritic score of the game.
 *  - platform: Platform[] - Array of platforms the game is available on.
 *
 * This component uses Chakra UI for styling and layout. It also utilizes react-icons
 * for platform-specific icons.
 *
 * The component dynamically renders platform icons based on the game's available platforms,
 * ensuring that each platform type is only rendered once per game.
 */
import {
    Card,
    CardBody,
    Text,
    Image,
    Divider,
    Heading, Stack, Flex, Tag, AspectRatio, useBreakpointValue
} from '@chakra-ui/react'

import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid, FaLinux } from 'react-icons/fa';

import { Platform, PlatformDetail } from "../hooks/useGamesData.ts"
import {IconType} from "react-icons";


interface Props {
    img_url: string;
    game_name: string;
    score: number;
    platform: Platform[];
}

type PlatformIconMapping = {
    [key: string]: IconType;
};

const platformIcons: PlatformIconMapping = {
    "PlayStation": FaPlaystation,
    "Xbox": FaXbox,
    "PC": FaWindows,
    "macOS": FaApple,
    "Apple": FaApple,
    "Android": FaAndroid,
    "Linux": FaLinux
};


function GameCard({ img_url, game_name, score, platform }: Props) {
    const maxCardWidth = useBreakpointValue({ base: "90%", md: "300px" });
    const renderedPlatforms = new Set()

    function renderPlatformIcon(platformDetail: PlatformDetail){
        const platformType = platformDetail.name.split( " ")[0]

        if (renderedPlatforms.has(platformType)){
            return null
        } else {
            renderedPlatforms.add(platformType)
            const IconComponent = platformIcons[platformType];

            return IconComponent ? <IconComponent key={platformDetail.id} aria-label={platformType}/> : null;
        }
    }

    return (
        <Card maxW={maxCardWidth} marginTop={10} w="full" h="350px" overflow='hidden' borderRadius="lg" boxShadow="md">
            <CardBody padding={0}>
                <AspectRatio ratio={16 / 9} width='100%'>
                    <Image
                        src={img_url}
                        alt={game_name}
                        objectFit='cover'
                    />
                </AspectRatio>
                <Stack p={4}  overflow="hidden">
                    <Divider />
                    <Flex justifyContent="space-between" alignItems="center" gap={5}>
                        <Heading size='md' isTruncated >{game_name}</Heading>
                        <Tag>{score}</Tag>
                    </Flex>
                    <Text fontSize='lg' color='gray.500' noOfLines={1}>
                        Platforms:
                    </Text>
                    <Flex alignItems='center' gap={2}>
                        {platform.map((platforms) => (
                            renderPlatformIcon(platforms.platform)
                        ))}
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default GameCard


