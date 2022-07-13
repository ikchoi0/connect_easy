import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  Button,
  Box,
  Container,
  Switch,
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import { Avatar } from '@mui/material';
import TextFieldWithLabel from '../components/TextFieldWithLabel';
import { submitImage } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProfile,
  getUserProfile,
} from '../../store/reducers/userProfileReducer';

const ProfilePage = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [originalImage, setOriginalImage] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [availability, setAvailability] = useState(false);

  const loadProfilesToState = (userProfile) => {
    setFirstName(userProfile.firstName);
    setLastName(userProfile.lastName);
    setEmail(userProfile.email);
    setDescription(userProfile.description);
    setStreet(userProfile.street);
    setCity(userProfile.city);
    setState(userProfile.state);
    setCountry(userProfile.country);
    setPostalCode(userProfile.postalCode);
    setPrice(userProfile.price);
    setCategory(userProfile.category);
    setOriginalImage(userProfile.profilePicture);

    // const data = {
    //   firstName,
    //   lastName,
    //   email,
    //   description,
    //   street,
    //   city,
    //   state,
    //   country,
    //   postalCode,
    //   price,
    //   category,
    //   imageFile,
    // };
    // console.log(data);
    // dispatch(setProfile(data));
  };

  const imageSelectHandler = (e) => {
    setImageFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleOnSaveButtonClick = () => {
    submitImage('', imageFile, history);
  };

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(getUserProfile());

    if (userProfile) {
      loadProfilesToState(userProfile);
    }

    // getUserProfile().then((res) => {
    //   console.log(res.data);
    //   setOriginalImage(res.data.options.profilePicture);
    // });
  }, []);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '2rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{ width: '100px', height: '100px' }}
              src={
                originalImage
                  ? 'https://connect-easy-images.s3.us-west-2.amazonaws.com/' +
                    originalImage
                  : previewImage
              }
            >
              {!previewImage && 'DK'}
            </Avatar>
            <Box>
              <Button
                variant="contained"
                component="label"
                startIcon={<AddPhotoAlternateIcon />}
                color="primary"
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => imageSelectHandler(e)}
                  style={{ display: 'none' }}
                />
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <TextFieldWithLabel
              type="email"
              label="email"
              value={email}
              setValue={setEmail}
            />
          </Box>
          <Box
            sx={{
              width: '500px',
              display: 'flex',
              gap: '2rem',
            }}
          >
            <TextFieldWithLabel
              variant="standard"
              label="First Name"
              value={firstName}
              setValue={setFirstName}
            />
            <TextFieldWithLabel
              variant="standard"
              label="Last Name"
              value={lastName}
              setValue={setLastName}
            />
          </Box>

          <Box sx={{ display: 'flex' }}>
            <TextFieldWithLabel
              multiline
              rows={8}
              variant="outlined"
              label="description"
              value={description}
              setValue={setDescription}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: '2rem' }}>
            <TextFieldWithLabel
              variant="standard"
              label="street"
              value={street}
              setValue={setStreet}
            />
            <TextFieldWithLabel
              variant="standard"
              label="city"
              value={city}
              setValue={setCity}
            />
            <TextFieldWithLabel
              variant="standard"
              label="state"
              value={state}
              setValue={setState}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: '2rem' }}>
            <TextFieldWithLabel
              variant="standard"
              label="country"
              value={country}
              setValue={setCountry}
            />
            <TextFieldWithLabel
              variant="standard"
              label="postal code"
              value={postalCode}
              setValue={setPostalCode}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: '2rem' }}>
            <TextFieldWithLabel
              variant="standard"
              label="price"
              value={price}
              setValue={setPrice}
            />
            <FormControl>
              <InputLabel id="Availability">Availability</InputLabel>
              <Switch
                label="Availability"
                defaultValue="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <MenuItem value="1">Available</MenuItem>
                <MenuItem value="2">Off</MenuItem>
              </Switch>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Box>

          <FormControl>
            <InputLabel id="category">Category</InputLabel>
            <Select
              label="Category"
              value={category ? category : ''}
              defaultValue="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <MenuItem value="1">Sales</MenuItem>
              <MenuItem value="2">Therapists</MenuItem>
              <MenuItem value="3">Lawyers</MenuItem>
              <MenuItem value="4">Developers</MenuItem>
              <MenuItem value="5">Mortgage</MenuItem>
              <MenuItem value="6">Doctors</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <Box sx={{ display: 'flex', width: '100%', gap: '2rem' }}>
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              startIcon={<CancelIcon />}
            >
              Save
            </Button>
            <Button
              // onClick={}
              variant="contained"
              type="submit"
              color="primary"
              startIcon={<SaveAltIcon />}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
