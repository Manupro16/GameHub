import { Grid, useBreakpointValue } from "@chakra-ui/react";
import  AttributeItem  from "./AttributeItem";
import {Genres, Platform} from "../Game";
import {Publisher} from "../pages/useIndividualGameData.ts";

interface GameAttributesProps {
    platforms: Platform[];
    genres: Genres[];
    metascore: number;
    publishers: Publisher[];
}

const GameAttributes = ({ platforms, genres, metascore, publishers }: GameAttributesProps) => {

    const templateColumns = useBreakpointValue({
        base: "0.2fr 0.1fr", // Stacks the grid items on smaller screens
    });

    const templateRows = useBreakpointValue({
        base: "1fr 1fr",
    });


    // Transform data to a simple array of strings for uniform handling
    const platformNames = platforms.map((platform) => platform.platform.name);
    const genreNames = genres.map((genre) => genre.name);
    const publisherNames = publishers.map((publisher) => publisher.name);


    return (

    <Grid templateColumns={templateColumns} templateRows={templateRows} gap={4} p={4}>
            <AttributeItem title="Platforms" items={platformNames} />
            <AttributeItem title="Metascore" items={[`${metascore}`]} />
            <AttributeItem title="Genres" items={genreNames} />
            <AttributeItem title="Publishers" items={publisherNames} />
        </Grid>
    );
};

export default GameAttributes;
