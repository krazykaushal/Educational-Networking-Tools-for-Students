import { React, useEffect, useState } from "react";
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Box,
  Divider,
  CardActions,
  CircularProgress,
} from "@mui/material";

// import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ImageUrl from "../../static";
import { useNavigate } from "react-router-dom";

const MyConnection = () => {
  const navigate = useNavigate();
  const [followersUsers, setFollowersUsers] = useState([]);
  const [followingUsers, setfollowingUsers] = useState([]);
  const [isPresent, setIsPresent] = useState(false);
  const [follower, setFollower] = useState(8);
  const [following, setFollowing] = useState(8);

  const handleProfile = (username) => {
    navigate("/profiles/" + username);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FINAL}/user/getProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFollowersUsers(data.data.user.follower);
          setfollowingUsers(data.data.user.following);
          setIsPresent(true);
        } else {
          alert(data.error);
        }
      });
  }, []);

  const ShowMoreFollower = () => {
    setFollower((prevValue) => prevValue + 4);
  };
  const ShowMoreFollowing = () => {
    setFollowing((prevValue) => prevValue + 4);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Navbar />
        {isPresent ? (
          <Box>
            <Typography
              variant="h5"
              textAlign={"center"}
              component="div"
              gutterBottom
              mt={2}
            >
              Followers ({followersUsers.length})
            </Typography>
            <Divider />
            <Grid container rowSpacing={3} columnSpacing={4} mt={0.5} mb={2}>
              {followersUsers.slice(0, follower).map((user) => (
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="125"
                      image={ImageUrl}
                    />
                    <CardContent>
                      {/* <Typography variant="h5" textAlign={"left"} component="div">
                      {user.name}
                    </Typography> */}
                      <Typography
                        variant="h6"
                        textAlign={"left"}
                        component="div"
                      >
                        {user.username}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        sx={{ borderRadius: "16px" }}
                        fullWidth
                        color="info"
                        variant="outlined"
                        onClick={() => handleProfile(user.username)}
                      >
                        View Profile
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box mt={2} mb={2}>
              {followersUsers.length > 8 ? (
                <Button
                  size="large"
                  color="success"
                  fullWidth
                  onClick={ShowMoreFollower}
                >
                  Load more
                </Button>
              ) : null}
            </Box>
            <Typography
              variant="h5"
              textAlign={"center"}
              component="div"
              gutterBottom
            >
              Following ({followingUsers.length})
            </Typography>
            <Divider />

            <Grid container rowSpacing={3} columnSpacing={4} mt={0.5} mb={2}>
              {followingUsers.slice(0, following).map((user) => (
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="125"
                      image={ImageUrl}
                    />
                    <CardContent>
                      {/* <Typography variant="h5" >
                      {user.name}
                    </Typography> */}
                      <Typography variant="h6">{user.username}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        sx={{ borderRadius: "16px" }}
                        fullWidth
                        color="info"
                        variant="outlined"
                        onClick={() => handleProfile(user.username)}
                      >
                        View Profile
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box mt={2} mb={2}>
              {followingUsers.length > 8 ? (
                <Button
                  size="large"
                  color="success"
                  fullWidth
                  onClick={ShowMoreFollowing}
                >
                  Load more
                </Button>
              ) : null}
            </Box>
          </Box>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </>
  );
};

export default MyConnection;
