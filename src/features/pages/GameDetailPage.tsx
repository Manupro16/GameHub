import { Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

function GameDetailPage() {
    const { id } = useParams();

    return(
        <>
            <Text> Game Detail Page for ID: {id} </Text>
        </>
    )
}

export default GameDetailPage