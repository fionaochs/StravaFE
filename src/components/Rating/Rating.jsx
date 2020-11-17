import React, { useState } from 'react';
import styles from './Rating.css';
import { makeStyles } from '@material-ui/core/styles';
import RatingMU from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { rateShoe } from '../Services/API';
import img from '../../Assets/salomon_supercross.png';
import findShoeImg from '../Services/shoeImg';

const Rating = () => {
  const [athleteID, setAthleteID] = useState(null);
  const [shoeID, setShoeID] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [stars, setStars] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [rated, setRated] = useState(false);
  // let img = findShoeImg(options[selectedIndex]);
let img;
  const options = [
    'Nike Zoom',
    'Altra Lone Peak',
    'Brooks Ghost',
    'Salomon Supercross',
    'Brooks Cascadia',
    'Salomon Ultra Pro',
    'Nike Pegasus'
  ];
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setShoeID(index+1)
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  img = findShoeImg(options[selectedIndex]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const saveRating = () => {
    rateShoe({athleteID, shoeID, stars})
    setRated(!rated)
    console.log(stars, shoeID, athleteID)
  }
  const labels = {
    0.5: 'Useless',
    1: 'Painful',
    1.5: 'Disgusting',
    2: 'You call this a shoe',
    2.5: 'Barefoot running is better',
    3: 'Meh',
    3.5: 'Good',
    4: 'Better',
    4.5: 'Excellent',
    5: 'Like running on clouds',
  };
  return (
    <div className={styles.Rating}>
      <h1 className={styles.h1}>Rate a shoe</h1>
      <p>For testing use Athlete Id of 1, 2 or 3</p>
      <form>
      <input data-testid="athleteID"
      type="text" value={athleteID} onChange={({ target }) => setAthleteID(target.value)} placeholder="Your Athlete ID"/>
      <div className={styles.inputs}>
      <img src={img} />
        <List component="nav" aria-label="Shoes">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Select a shoe to rate" secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      </div>
      <div className={styles.root}>
      <RatingMU
        className={styles.stars}
        name="hover-feedback"
        value={stars}
        precision={0.5}
        onChange={(event, newStars) => {
          setStars(newStars);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {stars !== null && <Box ml={2}>{labels[hover !== -1 ? hover : stars]}</Box>}
    </div>
      {/* <button className={styles.button} onClick={(e) => {e.preventDefault(); saveRating()}}>Submit your rating</button> */}
    </form>
    <button className={styles.button} onClick={(e) => {e.preventDefault(); saveRating()}}>Submit your rating</button>
      <h3 className={rated ? styles.rated : styles.notRated }>Thank you for rating {options[selectedIndex]}</h3>
    </div>
  );
};

export default Rating;