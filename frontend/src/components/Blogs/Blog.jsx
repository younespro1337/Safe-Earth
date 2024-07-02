import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
// import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { useDispatch ,useSelector } from 'react-redux'; 
import { UTurnLeft } from '@mui/icons-material';
import { fetchArticlesByTopic, updateArticles } from '../../actions/articlesActions';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import ReactMarkdown from 'react-markdown'
// import PropTypes from 'prop-types';
// import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];




const posts = [
  post1,
  post2,
  post3
];




const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
        component: 'h1',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6', component: 'h2' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: { component: Link },
    // You can add another component or remove this line entirely
    // li: {
    //   component: YourCustomComponent,
    // },
  },
};

const Main = ({ title, posts }) => (
  <Grid item xs={12} md={8}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {posts.map((postContent, index) => (
      <React.Fragment key={index}>
        {/* Render Markdown content using ReactMarkdown with options */}
        <ReactMarkdown components={options}>{postContent}</ReactMarkdown>
      </React.Fragment>
    ))}
  </Grid>
);




const sidebar = {
  title: 'Our Story',
  description: `
    SafEarth started with a vision - a vision to make a meaningful difference in the lives of people around the world. Our journey began in the heart of a small community, where a group of passionate individuals came together with the common goal of creating positive change.

    As we evolved, we realized the power of collaboration. SafEarth is not just a non-profit organization; it's a movement. We collaborate with people from diverse backgrounds, cultures, and perspectives, uniting under the shared belief that together, we can build a better future.

    Our initiatives extend beyond borders. From supporting education in underprivileged communities to providing essential resources during times of crisis, SafEarth stands as a beacon of hope. We believe in the collective strength of humanity, and every act of kindness, big or small, contributes to a global impact.

    Join us on this incredible journey of compassion and change. Together, we can make the world a better place for all.
  `,
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/younes-Raymond/earthQuaqApp/' },
    { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/younes-raymond/' },
    { name: 'Twitter', icon: TwitterIcon, url: 'https://twitter.com/younes_raymond' },
    { name: 'Facebook', icon: FacebookIcon, url: '' },
  ],
};


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const [mainFeaturedPost, setMainFeaturedPost] = useState({});
  const [featuredPosts, setFeaturedPosts ] = React.useState([])
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true); 
  const [Nposts, setNPosts] = React.useState([]);
  const articles = useSelector((state) => state.articles.articles);
  // console.log('articles', articles)


  React.useEffect(() => {
    localStorage.setItem('lastTopic', 'Technology'); // Set the default topic to "Technology"
    
    dispatch(fetchArticlesByTopic('Technology'))
      .then((response) => {
        console.log('Response:', response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [dispatch]);
  
  

useEffect(() => {
  if (articles.length > 0) {
    const firstArticle = articles[0];

    setMainFeaturedPost({
      title: firstArticle.headline?.main || 'Default Title',
      description: firstArticle.snippet || 'Default Description',
      image: firstArticle.multimedia?.[0]?.legacy?.xlarge.k  || 'https://source.unsplash.com/random?wallpapers',
      imageText: 'Image Description',
      linkText: 'Continue reading...',
      link: firstArticle.web_url || '#', // Use the actual link or a fallback
    });
   console.log(mainFeaturedPost.image)
    const updatedFeaturedPosts = articles.map((article) => {
      const rawDate = article.pub_date || new Date();
      const formattedDate = new Date(rawDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      });

      return {
        title: article.headline?.main || 'Default Title',
        date: formattedDate,
        description: article.snippet || 'Default Description',
        image: firstArticle.multimedia?.[0]?.legacy?.xlarge.k  || 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
        link: article.web_url || '#', // Use the actual link or a fallback
      };
    });

    setFeaturedPosts(updatedFeaturedPosts);
  }
}, [articles]);



useEffect(() => {
  const fetchMarkdown = async (path) => {
    const response = await fetch(path);
    const content = await response.text();
    return content;
  };

  const fetchPosts = async () => {
    try {
      const markdownContents = await Promise.all(posts.map(fetchMarkdown));
      // console.log('Markdown Contents:', markdownContents);
      setNPosts(markdownContents);
    } catch (error) {
      console.error('Error fetching markdown:', error);
    }
  };

  fetchPosts();
}, []);
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ height: '100vh', overflowY: 'auto' }}>
        <Header title="Safe Earth" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            {/* <Main title="From the firehose" posts={posts}  /> */}
            <Main title="From the firehose" posts={Nposts} />

            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Make a Difference with SafEarth"
        description="SafEarth is a non-profit organization dedicated to helping people in need, particularly those facing poverty. Your donations make a significant impact on improving the lives of individuals and communities around the world."
      />
    </ThemeProvider>
  );
}