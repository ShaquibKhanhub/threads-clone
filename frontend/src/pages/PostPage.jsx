import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
const PostPage = () => {
  const [liked, setLiked] = useState();
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zukerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzukerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            Id
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Let&apos;s talk about Threads</Text>

      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid "}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.png"} w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          238 replies
        </Text>
        <Box
          w={0.5}
          h={0.5}
          borderRadius={"full"}
          bg={"gray.light"}
          fontSize={"sm"}
        ></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like,reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      <Comment commnet={"Looks really good"} createdAt="2d" likes={100} username='johndoe' userAvatar='https://bit.ly/code-beast' />
      <Comment commnet={"superb looking"} createdAt="2d" likes={24} username='kent dodde' userAvatar='https://bit.ly/kent-c-dodds'/>
      <Comment commnet={"Mashallah what a pic"} createdAt="2d" likes={50} username='sally doe' userAvatar='https://bit.ly/prosper-baba'/>
    </>
  );
};

export default PostPage;
