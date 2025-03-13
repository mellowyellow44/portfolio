import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Chip,
  Divider,
  Button,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  Link as MuiLink
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundImage: theme.palette.mode === 'light'
    ? 'linear-gradient(120deg, #e0f7fa 0%, #bbdefb 100%)'
    : 'linear-gradient(120deg, #102027 0%, #0d47a1 100%)',
  color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
}));

const ExampleCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const FeatureItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: alpha(
    theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.dark, 
    0.1
  ),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  '&:hover': {
    backgroundColor: alpha(
      theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.dark, 
      0.2
    ),
  },
}));

// MUI Skill Page Component
const MuiSkillPage: React.FC = () => {
  const theme = useTheme();
  
  // Sample projects using MUI
  const projectExamples = [
    {
      id: 'dashboard',
      title: 'Analytics Dashboard',
      image: '/assets/projects/dashboard.jpg',
      description: 'A responsive admin dashboard using MUI Data Grid, Charts, and custom theming.',
      tags: ['MUI', 'React', 'TypeScript']
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      image: '/assets/projects/ecommerce.jpg',
      description: 'Shopping platform featuring MUI\'s Card components, product filtering, and cart functionality.',
      tags: ['MUI', 'Redux', 'Firebase']
    },
    {
      id: 'cms',
      title: 'Content Management System',
      image: '/assets/projects/cms.jpg',
      description: 'A full-featured CMS with rich text editing, image uploads, and user management.',
      tags: ['MUI', 'React Router', 'Node.js']
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Button 
            component={Link} 
            to="/skills" 
            startIcon={<ArrowBackIcon />}
            variant="text" 
            color="inherit"
            sx={{ mb: 4 }}
          >
            Back to All Skills
          </Button>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Material UI
              </Typography>
              <Typography variant="h5" paragraph>
                Building beautiful React applications with speed and precision
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                <Chip label="React Components" color="primary" />
                <Chip label="Material Design" color="primary" variant="outlined" />
                <Chip label="Responsive" color="primary" variant="outlined" />
                <Chip label="Accessible" color="primary" variant="outlined" />
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                My expertise with Material UI allows me to rapidly develop sophisticated, 
                responsive interfaces while maintaining design consistency and accessibility.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <img 
                src="/assets/skills/mui-hero.png" 
                alt="Material UI" 
                style={{ 
                  maxWidth: '80%', 
                  maxHeight: 300,
                  filter: theme.palette.mode === 'dark' ? 'drop-shadow(0 0 20px rgba(144, 202, 249, 0.5))' : 'none'
                }} 
              />
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Key Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" textAlign="center">
          Key Features & Capabilities
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Material UI offers a comprehensive suite of tools that I leverage to create
          exceptional user experiences
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem elevation={0}>
              <DesignServicesIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Component Library
              </Typography>
              <Typography variant="body2">
                Extensive pre-built components that can be customized to suit any design requirements.
              </Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem elevation={0}>
              <AutoAwesomeIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Theming System
              </Typography>
              <Typography variant="body2">
                Powerful theming capabilities to create consistent and branded user interfaces.
              </Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem elevation={0}>
              <SpeedIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Performance
              </Typography>
              <Typography variant="body2">
                Optimized components with minimal bundle size and efficient rendering strategies.
              </Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem elevation={0}>
              <CodeIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Developer Experience
              </Typography>
              <Typography variant="body2">
                TypeScript support, comprehensive documentation, and intuitive APIs.
              </Typography>
            </FeatureItem>
          </Grid>
        </Grid>
      </Container>

      {/* Skills & Experience */}
      <Box 
        sx={{ 
          py: 8, 
          backgroundColor: theme.palette.mode === 'light' 
            ? alpha(theme.palette.primary.light, 0.1)
            : alpha(theme.palette.primary.dark, 0.2)
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                My MUI Experience
              </Typography>
              <Typography variant="body1" paragraph>
                I've been working with Material UI for over 4 years, building everything from 
                dashboards to e-commerce platforms. I've developed a deep understanding of:
              </Typography>
              
              <List>
                {[
                  'Creating custom theme providers and design systems',
                  'Building responsive layouts with the Grid and Box components',
                  'Implementing advanced data tables with sorting, filtering and pagination',
                  'Creating custom hooks for form validation and state management',
                  'Optimizing performance for complex MUI applications'
                ].map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                Technical Proficiency
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Core Components
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {[
                    'Grid', 'Paper', 'Card', 'List', 'Table', 'Dialog', 'Drawer',
                    'AppBar', 'Tabs', 'Form Controls', 'Data Grid'
                  ].map((skill) => (
                    <Chip 
                      key={skill} 
                      label={skill} 
                      size="small" 
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Advanced Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {[
                    'Custom Theming', 'Styled API', 'Server-side Rendering', 'Theme Toggling',
                    'Animation Integration', 'Responsive Design', 'Accessibility'
                  ].map((skill) => (
                    <Chip 
                      key={skill} 
                      label={skill}
                      color="primary"
                      variant="outlined"
                      size="small" 
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom>
                  Complementary Technologies
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {[
                    'React', 'TypeScript', 'Emotion', 'Styled Components', 'React Router',
                    'Redux', 'Formik', 'React Query'
                  ].map((skill) => (
                    <Chip 
                      key={skill} 
                      label={skill}
                      color="secondary"
                      variant="outlined"
                      size="small" 
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Project Examples */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" textAlign="center">
          Projects Showcasing MUI Skills
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Here are some examples of projects I've built using Material UI
        </Typography>

        <Grid container spacing={4}>
          {projectExamples.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <ExampleCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {project.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Box>
                  <Button 
                    component={Link} 
                    to={`/projects/${project.id}`}
                    variant="outlined" 
                    size="small"
                    endIcon={<OpenInNewIcon />}
                  >
                    View Project
                  </Button>
                </CardContent>
              </ExampleCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Resources Section */}
      <Box 
        sx={{ 
          py: 8, 
          backgroundColor: theme.palette.mode === 'light' 
            ? '#f5f5f5' 
            : alpha(theme.palette.background.paper, 0.1)
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" textAlign="center">
            MUI Resources
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
            Helpful resources for learning and working with Material UI
          </Typography>

          <Grid container spacing={2}>
            {[
              { 
                title: 'Official Documentation', 
                url: 'https://mui.com/material-ui/getting-started/', 
                description: 'Comprehensive guides, API references, and examples from the MUI team' 
              },
              { 
                title: 'GitHub Repository', 
                url: 'https://github.com/mui/material-ui', 
                description: 'Source code, issues, and contributions to the Material UI library' 
              },
              { 
                title: 'MUI Community', 
                url: 'https://mui.com/material-ui/discover-more/community/', 
                description: 'Forums, Discord, and Stack Overflow tags for community support' 
              }
            ].map((resource, index) => (
              <Grid item xs={12} key={index}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {resource.description}
                  </Typography>
                  <MuiLink 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    Visit Resource <OpenInNewIcon fontSize="small" />
                  </MuiLink>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call To Action */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Let's Build Something Amazing Together
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
            I'm always looking for new opportunities to create beautiful, functional interfaces with Material UI.
            Whether you need a complete design system or help with a specific component, let's discuss how I can help.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button 
              component={Link} 
              to="/contact" 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ mx: 1, px: 4 }}
            >
              Contact Me
            </Button>
            <Button 
              component={Link} 
              to="/projects" 
              variant="outlined" 
              color="primary" 
              size="large"
              sx={{ mx: 1, px: 4 }}
            >
              See All Projects
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MuiSkillPage;