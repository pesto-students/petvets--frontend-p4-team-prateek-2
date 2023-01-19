import React from 'react';
import BlogDetail from './BlogDetail';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api-client';
import '../css/blog.css';
import {
  Card,
  CardContent,
  Grid,
  Button,
  CardMedia,
  CardActions,
  Typography,
} from '@mui/material';

// const blogData = [
//   {
//     title: '8 Reasons Why We Love Pomeranians',
//     description:
//       'What is it about the Pomeranian that always puts a smile on your face?  Maybe it’s because they always seem to be smiling, too!  Or maybe it’s that perky, foxy little face surrounded by all that glorious, fluffy fur....',
//     author: 'Jessica Northrup',
//     authorImg: watson,
//     date: '23 April 2019',
//   },
//   {
//     title: 'The United States of Pets: Hispanic Pet Ownership Demographics',
//     description:
//       'The United States is a nation of animal lovers, and the statistics on pet ownership and pet care spending in the U.S. prove that no matter who we are...',
//     author: 'Patricia Borbe',
//     authorImg: watson,
//     date: '23 April 2019',
//   },
//   {
//     title: 'Protecting Your Pets from Antifreeze Poisoning',
//     description:
//       'The arrival of winter is always a good time to remind pet owners about the dangers of antifreeze to dogs and cats. An estimated 90,000 pets are poisoned by antifreeze each year, not surprising since cats and dogs like...',
//     author: 'Jessica Northrup',
//     authorImg: watson,
//     date: '23 April 2019',
//   },
// ];

const Blog = () => {
  const [blogData, setBlogData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getBlogs = async () => {
      const blogs = await axiosClient.get('api/blogs/');
      setBlogData(blogs.data);
    };
    getBlogs();
  }, []);

  const goToBlog = (link) => {
    navigate({
      pathname: '/blogDetail',
      search: '?link=' + link,
    });
  };

  return (
    <>
      <>
        <Typography variant="h5" component="h2" class="blog-heading">
          Our Blogs
        </Typography>
        <Typography variant="h3" component="h2" class="blog-subhead">
          From Our Blog News
        </Typography>
      </>
      <Grid container spacing={2} style={{ margin: '15px' }}>
        {blogData.map((blog) => (
          <Grid item xs={4}>
            <Card
              sx={{ maxWidth: 345, maxHeight: 450 }}
              key="blog.title"
              className="card"
            >
              <CardMedia sx={{ height: 140 }} image={blog.image} src="" />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {blog.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {blog.article}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                  onClick={() => goToBlog(blog.link)}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Blog;
