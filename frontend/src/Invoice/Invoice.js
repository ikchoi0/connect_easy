import React, { useEffect, useState } from "react";
import moment from "moment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointments,
  getAppointmentsForClientId,
} from "../store/reducers/scheduleReducer";
import { filterAppointments } from "../shared/utils/filterAppointments";
import { filterAppointmentsByOptions } from "../shared/utils/filterAppointmentsByOptions";
import {
  FormControl,
  Typography,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { sortHelper } from "../shared/utils/sortHelper";
import { calculateTotalPrice } from "../shared/utils/calculator";
let filteredAppointments = [];
export default function ColumnGroupingTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listData, setListData] = useState([]);
  const [show, setShow] = useState("Show Invoice");
  const [totalPriceLimits, setTotalPriceLimits] = useState({
    min: 0,
    max: 0,
  });
  const [options, setOptions] = useState({
    sortName: "",
    desc: true,
    selectNameChoice: "",
    filterOption: "",
  });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const { appointments } = useSelector((state) => state.scheduler);
  const columns = [
    {
      id: "email",
      label: user.role === "consultant" ? "Client Email" : "Consultant Email",
      minWidth: 150,
      align: "left",
    },
    {
      id: "peerName",
      label: user.role === "consultant" ? "Client Name" : "Consultant Name",
      minWidth: 100,
      align: "left",
    },
    {
      id: "time",
      label: "Time",
      minWidth: 150,
      align: "left",
    },
    {
      id: "description",
      label: "Description",
      minWidth: 150,
      align: "right",
    },
    {
      id: "hourlyRate",
      label: "Hourly Rate",
      minWidth: 150,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "totalPrice",
      label: "Total Price",
      minWidth: 150,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];
  // console.log(user);
  useEffect(() => {
    if (user.role === "consultant") {
      dispatch(getAllAppointments(user.userId));
    } else {
      dispatch(getAppointmentsForClientId(user.userId));
    }
    filteredAppointments = filterAppointments(appointments, "Past");
    setListData(filteredAppointments);
  }, []);

  useEffect(() => {
    filteredAppointments = filterAppointmentsByOptions(
      listData,
      options.filterOption,
      user.role,
      options.selectNameChoice
    );
    setListData(filteredAppointments);

    // console.log(listData);
  }, [options, setListData]);

  // const filteredAppointments = filterAppointments(appointments, "Past");
  // console.log(appointments, filteredAppointments);
  const sortedAppointments = sortHelper(
    listData,
    options.sortName,
    user.role,
    options.desc
  );

  const nameList = new Set();
  const data = sortedAppointments.map((appointment) => {
    // const data = appointments.map((appointment) => {
    const totalCost = calculateTotalPrice(appointment);
    const peerName =
      user.role === "consultant" ? appointment.client : appointment.consultant;
    const email =
      user.role === "consultant"
        ? appointment.clientEmail
        : appointment.consultantEmail;
    const time =
      moment(appointment.date).format("MM/DD/YYYY") + " " + appointment.title;
    nameList.add(peerName);
    return {
      peerName: peerName,
      email: email,
      time: time,
      description: appointment.description,
      hourlyRate: appointment.consultantPrice,
      totalPrice: totalCost,
    };
  });
  // console.log(data);

  const handleSort = (event) => {
    const name = event.target.getAttribute("value");
    setOptions({
      ...options,
      desc: !options.desc,
      sortName: name,
    });
    // setDesc(!desc);
    // setSortName(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSelectChange = (event) => {
    const nameChoice = event.target.value;
    // setSelectNameChoice(nameChoice);
    // setFilterOption("name");
    setOptions({
      ...options,
      selectNameChoice: nameChoice,
      filterOption: "name",
    });
  };
  const handleReset = () => {
    if (show === "Show Invoice") {
      setShow("Reset Filter");
    }
    setOptions({
      ...options,
      desc: true,
      sortName: "",
      selectNameChoice: "",
      filterOption: "",
    });
    setListData(filterAppointments(appointments, "Past"));
  };
  const nameListItems = [];

  for (let name of nameList) {
    nameListItems.push(
      <MenuItem key={name} value={name}>
        {name}
      </MenuItem>
    );
  }
  const nameSelectField = (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <InputLabel>Filter By Name</InputLabel>

          <Select
            required
            value={options.selectNameChoice}
            label="nameFilter"
            onChange={handleSelectChange}
          >
            {nameList && nameListItems}
          </Select>
          <TextField
            id="filled-basic"
            label="Min Total Price"
            variant="filled"
          />
          <TextField
            id="filled-basic"
            label="Max Total Price"
            variant="filled"
          />
        </Box>

        <Button
          variant={show === "Show Invoice" ? "contained" : "outlined"}
          color={show === "Show Invoice" ? "error" : "success"}
          onClick={handleReset}
        >
          {show}
        </Button>
      </FormControl>
    </Grid>
  );
  return (
    <Paper sx={{ width: "100%" }}>
      {nameSelectField}
      <TableContainer sx={{ height: "100%" }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={12}>
                <Typography sx={{ fontSize: "2rem" }}>
                  Hello{" "}
                  <span
                    style={{
                      color: "#3CB371",
                      fontStyle: "italic",
                      fontWeight: "bold",
                    }}
                  >
                    {user.firstName}, {user.lastName}
                  </span>{" "}
                  ,
                </Typography>
                <Typography sx={{ fontSize: "2rem" }}>
                  Your are registered as{" "}
                  <span
                    style={{
                      color: "#3CB371",
                      textDecoration: "underline",
                    }}
                  >
                    {user.role}
                  </span>{" "}
                  !
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              {columns.map((column) => (
                <TableCell
                  onClick={handleSort}
                  key={column.id}
                  value={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <span>
                            {typeof value === "number" ? "$" : ""}
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </span>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
          {/* <TableRow sx={{ height: "100px" }}>Total</TableRow> */}
        </Table>
      </TableContainer>
    </Paper>
  );
}
