import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import watson from '../assets/images/team-2.jpg';
import '../css/blog.css';

const blogData = [
  {
    title: '8 Reasons Why We Love Pomeranians',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, placeat totam laborum maiores, esse assumenda porro error natus sit ipsam.        ',
    author: 'Dr. Cudi',
    authorImg: watson,
    date: '23 April 2019',
  },
  {
    title: 'Two time brush in a day can keep you healthy',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, placeat totam laborum maiores, esse assumenda porro error natus sit ipsam.        ',
    author: 'Dr. Sinthia',
    authorImg: watson,
    date: '23 April 2019',
  },
  {
    title: 'The tooth cancer is taking a challenge',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, placeat totam laborum maiores, esse assumenda porro error natus sit ipsam.        ',
    author: 'Dr. Cudi',
    authorImg: watson,
    date: '23 April 2019',
  },
];

const Blog = () => (
  <>
    <>
      <Typography variant="h5" component="h2" className="blog-heading">
        Our Blogs
      </Typography>
      <Typography variant="h3" component="h2" className="blog-subhead">
        From Our Blog News
      </Typography>
    </>
    <Grid container spacing={2} style={{ marginTop: '15px' }}>
      {blogData.map((blog, index) => (
        <Grid key={index} item xs={4}>
          <Card sx={{ maxWidth: 345 }} key="doc._id" className="card">
            <CardMedia sx={{ height: 140 }} image={blog.authorImg} src="" />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                {blog.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {blog.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
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

export default Blog;
