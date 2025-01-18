import { Flex, Spinner, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const HomePage = () => {
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getFeedPost = async () => {
      setLoading(true);
      setPosts([]);
      try {
        let res = await fetch(`${backendUrl}/api/posts/feed`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        console.log("data", data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPost();
  }, [showToast, setPosts]);
  return (
    <Flex gap="10" alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts.length === 0 && (
          <h1>Follow some users to see the feed</h1>
        )}

        {loading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )}

        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>
      <Box
        flex={30}
        display={{
          base: "none",
          md: "block",
        }}
      ></Box>
    </Flex>
  );
};

export default HomePage;
