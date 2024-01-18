import {Flex, Select, useBreakpointValue } from "@chakra-ui/react";

interface DropdownsProps {
    onPlatformSelect: (platform: string) => void;
    onSortSelect: (sortOption: string) => void;
}

function Dropdowns({ onPlatformSelect, onSortSelect }: DropdownsProps) {

    const selectWidth = useBreakpointValue({ base: "100%", sm: "200px", md: "250px" });


    return (
        <Flex alignItems='center' gap={3} paddingTop={5}>
            <Select placeholder='Platforms' width={selectWidth} onChange={(e) => onPlatformSelect(e.target.value)} >
                <option value='PC'>PC</option>
                <option value='PlayStation'>PlayStation</option>
                <option value='Xbox'>Xbox</option>
                <option value='macOS'>IOS</option>
                <option value='Android'>Android</option>
                <option value='Linux'>Linux</option>
            </Select>
            <Select placeholder='Order by:' width={selectWidth} onChange={(e) => onSortSelect(e.target.value)}>
                <option value='Newest'>Newest</option>
                <option value='Oldest'>Oldest</option>
                <option value='Highest Score'>Highest Score</option>
                <option value='Lowest Score'>Lowest Score</option>
            </Select>
        </Flex>
    )
}


export default Dropdowns;


