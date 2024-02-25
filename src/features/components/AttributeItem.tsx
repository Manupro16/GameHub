// AttributeItem.js
import { Box, Text } from "@chakra-ui/react";

interface Props {
    title: string;
    items: string[];
}

const AttributeItem = ({ title, items }: Props) => {
    return (
        <Box>
            <Text fontWeight="bold" color="gray.500">{title}:</Text>
            {items.map((item, index) => (
                <Text key={index} pl="10px">{item}</Text>
            ))}
        </Box>
    );
};

export default AttributeItem;
