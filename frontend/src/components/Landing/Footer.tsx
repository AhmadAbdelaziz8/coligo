import React from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
} from '@mui/material'
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material'

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        background: '#1a1a1a',
        color: 'white',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Coligo
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
              }}
            >
              Empowering students with cutting-edge technology to achieve academic excellence through interactive learning experiences.
            </Typography>
            
            {/* Social Media */}
            <Box>
              <IconButton sx={{ color: 'white', mr: 1 }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'white', mr: 1 }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'white', mr: 1 }}>
                <LinkedIn />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.7, '&:hover': { opacity: 1 } }}>
                About Us
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.7, '&:hover': { opacity: 1 } }}>
                Features
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.7, '&:hover': { opacity: 1 } }}>
                Pricing
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.7, '&:hover': { opacity: 1 } }}>
                Blog
              </Link>
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.7, '&:hover': { opacity: 1 } }}>
                Help Center
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.7, '&:hover': { opacity: 1 } }}>
                Contact Us
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.7, '&:hover': { opacity: 1 } }}>
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.7, '&:hover': { opacity: 1 } }}>
                Terms of Service
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  support@coligo.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  123 Education St, Learning City
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2024 Coligo. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Made with ❤️ for students everywhere
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer 