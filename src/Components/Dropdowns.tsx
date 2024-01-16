import {Flex, Select, useBreakpointValue } from "@chakra-ui/react";

function Dropdowns() {

    const selectWidth = useBreakpointValue({ base: "100%", sm: "200px", md: "250px" });


    return (
        <Flex alignItems='center' gap={3} paddingTop={5}>
            <Select placeholder='Platforms' width={selectWidth}>
                <option value='PC'>PC</option>
                <option value='Playstation'>PlayStation</option>
                <option value='Xbox'>Xbox</option>
                <option value='IOS'>IOS</option>
                <option value='Android'>Android</option>
                <option value='Linux'>Linux</option>
            </Select>
            <Select placeholder='Order by:' width={selectWidth}>
                <option value='Relevance'>Relevance</option>
                <option value='Date added'>Date added</option>
                <option value='Name'>Name</option>
                <option value='Popularity'>Popularity</option>
                <option value='Average rating'>Average rating</option>
            </Select>
        </Flex>
    )
}



export default Dropdowns;