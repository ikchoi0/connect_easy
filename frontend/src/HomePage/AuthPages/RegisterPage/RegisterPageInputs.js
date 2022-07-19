import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextFieldWithLabel from "../../../shared/components/TextFieldWithLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { category } from "../../../store/reducers/categoryReducer";

const RegisterPageInputs = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  consultantCheck,
  setConsultantCheck,
  setConsultantCategoryId,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(category());
  }, []);

  const { categoryList } = useSelector((state) => state.category);

  const [selectChoice, setSelectChoice] = useState("");
  const handleChange = (event) => {
    const categorySelected = event.target.value;
    setConsultantCategoryId(categorySelected);
    setSelectChoice(categorySelected);
  };
  const consultantCategoryTextField = (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>Service Category</InputLabel>

        <Select
          required
          value={selectChoice}
          label="Service Category"
          onChange={handleChange}
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
      </FormControl>
    </Grid>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextFieldWithLabel
          id="firstName"
          label="First Name"
          autoComplete="given-name"
          autoFocus={true}
          value={firstName}
          setValue={setFirstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldWithLabel
          id="lastName"
          label="Last Name"
          autoComplete="family-name"
          value={lastName}
          setValue={setLastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldWithLabel
          id="email"
          label="Email Address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldWithLabel
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          setValue={setPassword}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              autoComplete="Service Category"
              checked={consultantCheck}
              onChange={(e) => setConsultantCheck(e.target.checked)}
              value="allowExtraEmails"
              color="primary"
            />
          }
          label="Consultant?"
        />
      </Grid>
      {consultantCheck && consultantCategoryTextField}
    </Grid>
  );
};

export default RegisterPageInputs;
