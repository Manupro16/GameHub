import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import {Box, Heading, Text} from '@chakra-ui/react';
import NavBar from "../Shared/NavBar.tsx";

function ErrorPage() {

    const error = useRouteError()

    return (
        <>
            <NavBar />
            <Box marginLeft='20px'>
                <Heading>Oops...</Heading>
                <Text> { isRouteErrorResponse(error) ? 'This page does not exist' : 'Unexpected error' } </Text>
            </Box>
        </>
    )

}

export default ErrorPage