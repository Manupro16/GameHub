import {Flex, Image, Link, ListItem} from "@chakra-ui/react";

interface Props {
    img_url: string;
    type: string;
}

function GenreCategory( props: Props ) {


    return (
        <ListItem>
            <Flex alignItems='center' gap={[1, 2, 3]}>
                <Image
                    src={props.img_url}
                    boxSize={['40px', '50px', '60px']}
                    objectFit='cover'
                    borderRadius='10px'
                    alt={`${props.type} Genre`}
                />
                <Link
                    fontSize={['sm', 'md', 'lg']}
                    _hover={{ textDecoration: 'underline' }}
                >
                    {props.type}
                </Link>
            </Flex>
        </ListItem>
    )
}


export default GenreCategory;