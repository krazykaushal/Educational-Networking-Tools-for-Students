import {
  Typography,
  Grid,
  Container,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import PostCards from "../../components/PostCards";

const user_id = "jkl@jkl.com";

// const posts = [
//   {
//     title: "Om",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//     user_id: "",
//     comments: [],
//     post_id: "",
//     likes: [],
//   },
//   {
//     title: "Harsh",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//     user_id: "",
//     comments: [],
//     post_id: "",
//     likes: [],
//   },
//   {
//     title: "Priyanshi",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//     user_id: "",
//     comments: [],
//     post_id: "",
//     likes: [],
//   },
//   {
//     title: "Kaushal",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//     user_id: "",
//     comments: [],
//     post_id: "",
//     likes: [],
//   },
//   {
//     title: "Devdeep",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//     user_id: "",
//     comments: [],
//     post_id: "",
//     likes: [],
//   },
//   {
//     title: "Achyut",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//     user_id: "",
//     comments: [],
//     post_id: "",
//     likes: [],
//   },
// ];

const ShowPostCards = () => {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    fetch(`http://localhost:7000/post/getPostsUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPosts(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const ShowMoreItems = () => {
    setVisible((prevValue) => prevValue + 2);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Navbar />
          <Typography
            variant="h4"
            textAlign={"center"}
            component="div"
            gutterBottom
            mt={2}
          >
            My Posts
          </Typography>
          <Divider />
          <Grid container rowSpacing={3} columnSpacing={4} mt={0.5} mb={2}>
            {posts.slice(0, visible).map((post) => (
              <Grid item xs={12} sm={6} md={6}>
                <PostCards item={post} comments={post.comments}/>
              </Grid>
            ))}
          </Grid>
          <Box mt={2} mb={2}>
            <Button
              size="large"
              color="success"
              fullWidth
              onClick={ShowMoreItems}
            >
              Load more
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ShowPostCards;
