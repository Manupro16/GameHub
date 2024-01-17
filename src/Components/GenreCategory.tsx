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