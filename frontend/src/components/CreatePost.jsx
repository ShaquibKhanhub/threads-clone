import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "../atoms/postsAtom";
import userAtom from "../atoms/userAtom";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import axiosInstance from "../utils/api";

const MAX_CHAR = 500;
const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const user = useRecoilValue(userAtom);
  const imageRef = useRef(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };
  const handleCreatePost = async () => {
    setLoading(true);
    try {
      let res = await axiosInstance.post("/api/posts/create", {
        postedBy: user._id,
        text: postText,
        img: imgUrl,
      });

      const data = res.data;
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post created successfully", "success");
      if (username === user.username) {
        setPosts([data, ...posts]);
      }
      onClose();
      setPostText("");
      setImgUrl("");
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={5}
        size={{ base: "sm", sm: "md" }}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        <AddIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here"
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize={"xs"}
                fontWeight={"semibold"}
                textAlign={"right"}
                m={1}
                color={"gray.800"}
              >
                {remainingChar}/{MAX_CHAR}
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onClick={handleImageChange}
              />
              <BsFillImageFill
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>
            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imgUrl} alt="Selected img" />
                <CloseButton
                  onClick={() => {
                    setImgUrl("");
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
