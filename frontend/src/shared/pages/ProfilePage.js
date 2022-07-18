import { useState, useEffect } from 'react';

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

import { useDispatch, useSelector } from 'react-redux';
import {
  getUserProfile,
  updateUserProfile,
} from '../../store/reducers/userProfileReducer';
import { category } from '../../store/reducers/categoryReducer';

const ProfilePage = () => {
  const userProfile = useSelector((state) => state.userProfile);
  const { categoryList } = useSelector((state) => state.category);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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
    setOriginalImage(userProfile.profilePicture);
    setSelectedCategory(userProfile.category);

    console.log(userProfile.category);

    console.log(categoryList.filter((c) => c.id === userProfile.category));
  };

  const handleCategoryOnChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const imageSelectHandler = (e) => {
    setImageFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleOnSaveButtonClick = () => {
    const data = {
      firstName,
      lastName,
      email,
      description,
      street,
      city,
      state,
      country,
      postalCode,
      price,
      selectedCategory,
      imageFile,
    };

    dispatch(updateUserProfile(data));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(category());

    if (userProfile) {
      loadProfilesToState(userProfile);
    }
  }, [userProfile]);

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
            {originalImage && !previewImage && (
              <Avatar
                sx={{ width: '100px', height: '100px' }}
                src={
                  'https://connect-easy-images.s3.us-west-2.amazonaws.com/' +
                  originalImage
                }
              ></Avatar>
            )}
            {!originalImage && !previewImage && (
              <Avatar sx={{ width: '100px', height: '100px' }}>
                {firstName.substring(0, 2)}
              </Avatar>
            )}
            {previewImage && (
              <Avatar
                sx={{ width: '100px', height: '100px' }}
                src={
                  originalImage || previewImage
                    ? previewImage
                      ? previewImage
                      : 'https://connect-easy-images.s3.us-west-2.amazonaws.com/' +
                        originalImage
                    : null
                }
              ></Avatar>
            )}
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
              disabled={true}
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
            {/* <FormControl>
              <InputLabel id="Availability">Availability</InputLabel>
              <Switch
                label="Availability"
                defaultValue="category"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                <MenuItem value="1">Available</MenuItem>
                <MenuItem value="2">Off</MenuItem>
              </Switch>
              <FormHelperText>Required</FormHelperText>
            </FormControl> */}
          </Box>

          <FormControl>
            <InputLabel id="category">Category</InputLabel>
            <Select
              label="Category"
              value={selectedCategory}
              onChange={handleCategoryOnChange}
            >
              {categoryList &&
                categoryList.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  );
                })}
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
              Cancel
            </Button>
            <Button
              disabled={userProfile.isSaving}
              onClick={handleOnSaveButtonClick}
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
