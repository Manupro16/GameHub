/**
 * SkeletonGameCard Component
 *
 * Purpose:
 * Renders a skeleton screen for game cards. It is used as a placeholder while the game data is being loaded,
 * providing a better user experience during data fetching operations.
 *
 * Usage:
 * This component is utilized in the GamesList component, particularly when game data is being fetched asynchronously.
 * It helps in maintaining a consistent layout and minimizes layout shifts, improving the perceived performance.
 *
 * Design:
 * - The component consists of a Skeleton component for the game image and SkeletonText for the game details.
 * - It mimics the layout of a typical game card but without actual data.
 *
 * Accessibility:
 * As a purely visual component designed for loading states, it does not include interactive or focusable elements,
 * thus not impacting the accessibility of the page.
 *
 * Note:
 * This component does not take any props and is static in nature. It should be replaced with actual game card components
 * once the data is loaded.
 */
import {  Card, CardBody, AspectRatio, Stack, Divider, Flex, Tag, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';


function SkeletonGameCard() {
    return (
        <Card maxW="300px" marginTop={10} w="full" h="350px" overflow='hidden' borderRadius="lg" boxShadow="md">
            <CardBody padding={0}>
                <AspectRatio ratio={16 / 9} width='100%'>
                    <Skeleton height="100%" />
                </AspectRatio>
                <Stack p={4} overflow="hidden">
                    <Divider />
                    <Flex justifyContent="space-between" alignItems="center" gap={5}>
                        <SkeletonText mt="4" noOfLines={1} width="70%" />
                        <Tag>
                            <SkeletonCircle size="8" />
                        </Tag>
                    </Flex>
                    <SkeletonText mt="4" noOfLines={2} />
                    <Flex alignItems='center' gap={2}>
                        <SkeletonCircle size="10" />
                        <SkeletonCircle size="10" />
                        <SkeletonCircle size="10" />
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
}

export default SkeletonGameCard;
