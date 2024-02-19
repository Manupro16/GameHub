/**
 * Dropdowns.tsx
 *
 * This component renders two dropdown menus for selecting game platforms and sorting options.
 * It is used in the App component to allow users to filter and sort the displayed game list.
 *
 * Props:
 * - onPlatformSelect: A function that is called when the user selects a platform. It receives the selected platform as a parameter.
 * - onSortSelect: A function that is called when the user selects a sorting option. It receives the selected sorting option as a parameter.
 *
 * The component uses Chakra UI's `Flex` and `Select` components for layout and dropdown functionality.
 * The `useBreakpointValue` hook from Chakra UI is used to ensure responsive behavior of the dropdowns.
 *
 * Dropdown Options:
 * - Platforms: Includes options like PC, PlayStation, Xbox, macOS, Android, and Linux.
 * - Order by: Includes options for sorting like Newest, Oldest, Highest Score, and Lowest Score.
 *
 * The values in the options should be consistent with the data structure used in the game list for proper filtering and sorting.
 */

import {Flex, Select, useBreakpointValue } from "@chakra-ui/react";
import { useGamesStore } from "../Game";

interface setPlatform {
    type: "PLATFORM"
    value: string
}

interface setOrder {
    type: "ORDER"
    value: string
}

type MethodAction = setPlatform | setOrder


function Dropdowns() {

    const {setPlatform  , setSortOption, updateFilteredSortedGames} = useGamesStore()
    const selectWidth = useBreakpointValue({ base: "100%", sm: "200px", md: "250px" });


    function updateMethod(action: MethodAction) {
        switch (action.type) {
            case "PLATFORM":
                setPlatform(action.value)
                break

            case "ORDER":
                setSortOption(action.value)
                break
        }

        updateFilteredSortedGames()
    }



    return (
        <Flex alignItems='center' gap={3} paddingTop={5}>
            <Select placeholder='Platforms' width={selectWidth} onChange={(e) => updateMethod({type: 'PLATFORM', value: e.target.value})} >
                <option value='PC'>PC</option>
                <option value='PlayStation'>PlayStation</option>
                <option value='Xbox'>Xbox</option>
                <option value='macOS'>IOS</option>
                <option value='Android'>Android</option>
                <option value='Linux'>Linux</option>
            </Select>
            <Select placeholder='Order by:' width={selectWidth} onChange={(e) => updateMethod({type: 'ORDER', value: e.target.value})}>
                <option value='Newest'>Newest</option>
                <option value='Oldest'>Oldest</option>
                <option value='Highest Score'>Highest Score</option>
                <option value='Lowest Score'>Lowest Score</option>
            </Select>
        </Flex>
    )
}


export default Dropdowns;


