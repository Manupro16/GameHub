import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

function SkeletonGenreCategory() {
    return (
        <Box padding="4">
            <Flex alignItems="center" gap="4">
                <Skeleton height="60px" width="60px" borderRadius="10px" />
                <SkeletonText mt="4" noOfLines={1} width="70%" />
            </Flex>
        </Box>
    );
}

export default SkeletonGenreCategory;