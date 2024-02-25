import { useState } from 'react';
import { Button, Box, Text } from '@chakra-ui/react';

interface ShowMoreTextProps {
    text: string;
    wordLimit?: number;
}

function ShowMoreText({ text, wordLimit = 300 }: ShowMoreTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const words = text.split(' ');

    const handleToggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const renderContent = () => {
        // If the content does not exceed the word limit or is expanded, show all text
        if (words.length <= wordLimit || isExpanded) {
            return (
                <>
                    <Text as="span">{text}</Text>
                    {words.length > wordLimit && (
                        <Button onClick={handleToggleExpanded} variant="link" colorScheme="blue" size="sm" ml={2}>
                            Show less
                        </Button>
                    )}
                </>
            );
        }

        // If the content exceeds the word limit and is not expanded, show truncated text
        return (
            <>
                <Text as="span">{words.slice(0, wordLimit).join(' ')}... </Text>
                <Button onClick={handleToggleExpanded} variant="link" colorScheme="blue" size="sm">
                    Show more
                </Button>
            </>
        );
    };

    return (
        <Box>
            {renderContent()}
        </Box>
    );
}

export default ShowMoreText;
