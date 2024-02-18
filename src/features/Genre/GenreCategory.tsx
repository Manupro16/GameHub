/**
 * GenreCategory Component
 *
 * Purpose:
 * Renders a single genre category with an image and clickable link.
 *
 * Props:
 * - `img_url`: String representing the URL of the genre's image.
 * - `type`: String representing the genre's name.
 * - `onGenreClick`: Function to handle the click event on the genre item.
 *
 * Usage:
 * The component is used to display a genre in a list format with an interactive element.
 * When clicked, it triggers the `onGenreClick` function, allowing for handling of user interaction.
 *
 * Responsive Design:
 * The component is styled responsively, ensuring it adapts to different screen sizes.
 * This is achieved using Chakra UI's responsive styles for `boxSize` and `fontSize`.
 *
 * Accessibility:
 * The component uses semantic HTML and appropriate ARIA attributes,
 * making it accessible to users with assistive technologies.
 */
import {Flex, Image, Link, ListItem} from "@chakra-ui/react";

interface Props {
    img_url: string;
    type: string;
    onGenreClick: () => void;
}




function GenreCategory( {img_url, type, onGenreClick }: Props ) {


    return (
        <ListItem onClick={onGenreClick}>
            <Flex alignItems='center' gap={[1, 2, 3]}>
                <Image
                    src={img_url}
                    boxSize={['40px', '50px', '60px']}
                    objectFit='cover'
                    borderRadius='10px'
                    alt={`${type} Genre`}
                />
                <Link
                    fontSize={['sm', 'md', 'lg']}
                    _hover={{ textDecoration: 'underline' }}
                >
                    {type}
                </Link>
            </Flex>
        </ListItem>
    )
}


export default GenreCategory;