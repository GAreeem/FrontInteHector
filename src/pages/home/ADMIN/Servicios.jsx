import { useState } from "react";
import { Box, Button, IconButton, Paper, Typography, Grid, Link, Chip, Card, CardContent, Stack, TextField, CardMedia } from "@mui/material";
import { Add as AddIcon, Star as StarIcon, FilterList as FilterListIcon, ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import GradeIcon from '@mui/icons-material/Grade';
import LayoutAdmin from "./LayoutAdmin";
import { useNavigate } from "react-router-dom";

const Servicios = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
 
  const tours = [
    {
      id: 1,
      title: "Majestic Mountain Adventures",
      country: "United States",
      date: "27-28 Jul 2025",
      price: "$83.74",
      oldPrice: "$83.74",
      rating: 4.2,
      images: ["https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSC10s_V3Vg6km3apQtIU8YTmYaSBcL_ofHcsaqCaxtPg0qCq6lnnlYUxGLWccPuNtFPlScbRzaBl8_XrZDV2LRRMDb6jYhibzVwkiMBA",
         "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrCaZ1aj_S3m2bSJyjIrswZ61exEJ2q3iILPlRsfn4pDd542MqtGaXDApTztkJf0H3supmV3toofPWvEa80z8PU7GaoJ763yytBTH2rei_lx62ReojE9z7nwaXj9r1uH36ZpXb-Kg=w675-h390-n-k-no", 
         "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqs28C729C9ZrgJ5RbFpRBcS1ciTy8JrhXpHpvnXXHZABf2nnT5_WbX2UT1Yzwsb0EmgiNTkEOeeyEQLF_yFNyTzPOhpMzdLqtu9D-c8e5dI-VsVTc3B42qx1eONEeTKLljQEgn=w675-h390-n-k-no"]
    },
    {
      id: 2,
      title: "Island Hopping Extravaganza",
      country: "Canada",
      date: "26-27 Jul 2025",
      price: "$97.14",
      oldPrice: "$97.14",
      rating: 3.7,
      images: ["/images/img4.jpg", "/images/img5.jpg", "/images/img6.jpg"]
    },
    {
      id: 3,
      title: "Cultural Wonders of Europe",
      country: "United Kingdom",
      date: "25-26 Jul 2025",
      price: "$68.71",
      oldPrice: "$68.71",
      rating: 4.5,
      images: ["/images/img7.jpg", "/images/img8.jpg", "/images/img9.jpg"]
    }
  ];

 return (
    <LayoutAdmin>
      <Box pl={3} pr={3}>
        <Typography variant="h5" mb={2}>List</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 300 }}
          />
          <Box display="flex" alignItems="center" gap={2}>
            <Button startIcon={<FilterListIcon />} variant="text">Filters</Button>
            <Button endIcon={<ArrowDropDownIcon />} variant="text">Sort by: Latest</Button>
            <Button startIcon={<AddIcon />}  onClick={() => navigate("/registro-servicio")} variant="contained">Add tour</Button>
          </Box>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {tours.map((tour) => (
            <Grid size={{ xs: 2, sm: 4, md: 4 }} key={tour.id}>
              <Card sx={{ borderRadius: 3 }}>
                <CardMedia sx={{ position: 'relative', height: 200 }}>
                  <Grid container spacing={1}>
                    <Grid size={8}>
                        <img src={tour.images[0]} alt={tour.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                    </Grid>
                  <Chip
                    label={<>{tour.price}</>}
                    sx={{ position: 'absolute', top: 10, left: 10, bgcolor: 'rgba(0,0,0,0.7)', color: 'white', fontWeight: 'bold' }}
                  />
                 <Chip label={tour.rating} icon={<GradeIcon fontSize="small" />} color="default"  sx={{position: 'absolute',top: 10, right: 10, bgcolor: '#fff5cc',  fontWeight: 'bold', fontSize: '0.85rem', 
                             '& .MuiChip-icon': {color: '#ffcc00',},}}/>
                  <Grid size={4}>
                     <Box display="flex" flexDirection="column" justifyContent="space-between" height="200px" gap={1}>
      {tour.images.slice(1).map((img, idx) => (
        <Box key={idx} sx={{ height: 'calc((200px - 8px) / 2)' }}> {/* 8px = gap 1 */}
          <img
            src={img}
            alt={`small-${idx}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: idx === 0 ? '0 12px 0 0' : '0 0 12px 0'
            }}
          />
        </Box>
      ))}
    </Box>
                  </Grid>
                     </Grid>
                </CardMedia>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{tour.title}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <Typography variant="body2" color="textSecondary">{tour.country}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="textSecondary">{tour.date}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="textSecondary">12 Booked</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Box>
    </LayoutAdmin>
  );
}

export default Servicios;
