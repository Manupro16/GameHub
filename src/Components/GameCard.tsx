import {
    Card,
    CardBody,
    Text,
    Image,
    Divider,
    Heading, Stack, Flex, Tag, AspectRatio, useBreakpointValue
} from '@chakra-ui/react'

import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid, FaLinux } from 'react-icons/fa';


function GameCard() {

    const maxCardWidth = useBreakpointValue({ base: "90%", md: "sm" });

    return (
        <Card maxW={maxCardWidth} marginTop={10} overflow="hidden" borderRadius="lg" boxShadow="md">
            <CardBody padding={0}>
                <AspectRatio ratio={16 / 12} width='100%'>
                    <Image
                        src="https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
                        alt='Grand Theft Auto V'
                        objectFit='cover'
                    />
                </AspectRatio>
                <Stack p={4}>
                    <Divider />
                    <Flex justifyContent="space-between" alignItems="center" gap={5}>
                        <Heading size='md'>Grand Theft Auto V</Heading>
                        <Tag>86</Tag>
                    </Flex>
                    <Text fontSize='lg' color='gray.500' marginTop={2}>
                        Platforms:
                    </Text>
                    <Flex alignItems='center' gap={2}>
                        <FaPlaystation aria-label='play' />
                        <FaXbox />
                        <FaApple />
                        <FaAndroid />
                        <FaLinux />
                        <FaWindows />
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default GameCard


