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


interface Props {
    img_url: string;
    game_name: string;
    score: number;
    platform: Platform[];
}


function GameCard(props: Props) {

    const maxCardWidth = useBreakpointValue({ base: "90%", md: "300px" });

    const renderedPlatforms = new Set()


    function renderPlatformIcon(platform: PlatformDetail){

        const platformType = platform.name.split( " ")[0]


        if (renderedPlatforms.has(platformType)){
            return null
        } else {
            renderedPlatforms.add(platformType)

            if (platform.name.includes("PlayStation")) {
                return <FaPlaystation key={platform.id} aria-label='PlayStation' />
            }

            if (platform.name.includes('Xbox')) {
                return <FaXbox key={platform.id} aria-label='Xbox'/>;
            }

            if (platform.name.includes('PC')) {
                return <FaWindows key={platform.id} aria-label='Windows'/>;
            }

            if (platform.name.includes('macOS') || platform.name.includes('Apple')) {
                return <FaApple key={platform.id} aria-label='Mac'/>;
            }

            if (platform.name.includes('Android')) {
                return <FaAndroid key={platform.id} aria-label='Android'/>;
            }

            if (platform.name.includes('Linux')) {
                return <FaLinux key={platform.id} aria-label='Linux'/>;
            }

            else {
                return null;
            }
        }
    }

    return (
        <Card maxW={maxCardWidth} marginTop={10} w="full" h="350px" overflow='hidden' borderRadius="lg" boxShadow="md">
            <CardBody padding={0}>
                <AspectRatio ratio={16 / 9} width='100%'>
                    <Image
                        src={props.img_url}
                        alt={props.game_name}
                        objectFit='cover'
                    />
                </AspectRatio>
                <Stack p={4}  overflow="hidden">
                    <Divider />
                    <Flex justifyContent="space-between" alignItems="center" gap={5}>
                        <Heading size='md' isTruncated >{props.game_name}</Heading>
                        <Tag>{props.score}</Tag>
                    </Flex>
                    <Text fontSize='lg' color='gray.500' noOfLines={1}>
                        Platforms:
                    </Text>
                    <Flex alignItems='center' gap={2}>
                        {props.platform.map((platforms) => (
                            renderPlatformIcon(platforms.platform)
                        ))}
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default GameCard


