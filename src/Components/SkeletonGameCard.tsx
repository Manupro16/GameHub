
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
