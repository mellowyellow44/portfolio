import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  CardMedia, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& img': {
    maxHeight: 100,
    objectFit: 'contain',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 36,
  color: theme.palette.primary.main,
}));

// Skill Card Component
interface SkillCardProps {
  id: string;
  title: string;
  logoSrc: string;
  description: string;
  bulletPoints: string[];
  path: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  id, 
  title, 
  logoSrc, 
  description, 
  bulletPoints, 
  path 
}) => {
  return (
    <StyledCard>
      <CardActionArea component={Link} to={path} sx={{ height: '100%' }}>
        <CardMediaStyled>
          <img src={logoSrc} alt={`${title} logo`} />
        </CardMediaStyled>
        <CardContent sx={{ flexGrow: 1, pb: 3 }}>
          <Typography gutterBottom variant="h5" component="div" align="center" fontWeight="bold">
            {title}
          </Typography>
          <Divider sx={{ my: 1.5 }} />
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
          <List dense disablePadding>
            {bulletPoints.map((point, index) => (
              <ListItem key={`${id}-point-${index}`} disableGutters sx={{ py: 0.5 }}>
                <StyledListItemIcon>
                  <CheckCircleOutlineIcon fontSize="small" />
                </StyledListItemIcon>
                <ListItemText primary={point} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

// Skill data
const skillsData: SkillCardProps[] = [
  {
    id: 'mui',
    title: 'Material UI',
    logoSrc: '/assets/skills/mui-logo.png', // Placeholder - you'll need to add actual images
    description: 'Comprehensive library of React components implementing Google\'s Material Design.',
    bulletPoints: [
      'Responsive component library',
      'Theming & customization',
      'Accessible UI components',
      'Advanced grid system'
    ],
    path: '/skills/mui'
  },
  {
    id: 'react',
    title: 'React',
    logoSrc: '/assets/skills/react-logo.png',
    description: 'JavaScript library for building user interfaces with reusable components.',
    bulletPoints: [
      'Component-based architecture',
      'Virtual DOM for performance',
      'Declarative UI development',
      'Extensive ecosystem'
    ],
    path: '/skills/react'
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    logoSrc: '/assets/skills/typescript-logo.png',
    description: 'Strongly typed programming language that builds on JavaScript for safer code.',
    bulletPoints: [
      'Static type checking',
      'IDE integration & IntelliSense',
      'Early error detection',
      'Enhanced code maintainability'
    ],
    path: '/skills/typescript'
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    logoSrc: '/assets/skills/nodejs-logo.png',
    description: 'JavaScript runtime built on Chrome\'s V8 engine for server-side development.',
    bulletPoints: [
      'Asynchronous & event-driven',
      'RESTful API development',
      'Microservices architecture',
      'Real-time applications'
    ],
    path: '/skills/nodejs'
  },
  {
    id: 'graphql',
    title: 'GraphQL',
    logoSrc: '/assets/skills/graphql-logo.png',
    description: 'Query language for APIs and runtime for fulfilling those queries with existing data.',
    bulletPoints: [
      'Type system definition',
      'Client-specified queries',
      'Efficient data loading',
      'Powerful developer tools'
    ],
    path: '/skills/graphql'
  },
  {
    id: 'aws',
    title: 'AWS',
    logoSrc: '/assets/skills/aws-logo.png',
    description: 'Comprehensive cloud platform with over 200 fully featured services.',
    bulletPoints: [
      'Serverless architecture',
      'Infrastructure as code',
      'CI/CD pipeline integration',
      'Scalable cloud solutions'
    ],
    path: '/skills/aws'
  }
];

// Main Skills Page Component
const SkillsPage: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        py: 8,
        minHeight: '100vh',
        background: theme.palette.mode === 'light' 
          ? 'linear-gradient(120deg, #f0f0f0 0%, #ffffff 100%)' 
          : 'linear-gradient(120deg, #1a1a1a 0%, #2d2d2d 100%)'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 800,
              backgroundImage: theme.palette.mode === 'light'
                ? 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)'
                : 'linear-gradient(45deg, #5C9CE6 30%, #83B4E6 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Technical Skills
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            A showcase of my expertise across various technologies and frameworks
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {skillsData.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill.id}>
              <SkillCard {...skill} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SkillsPage;