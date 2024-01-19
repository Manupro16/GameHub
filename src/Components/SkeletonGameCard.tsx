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
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

function SkeletonGameCard() {
    return (
        <Box padding="6" boxShadow="lg" bg="white" borderRadius="md">
            <Skeleton height="200px" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
    );
}

export default SkeletonGameCard;
