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
  getPastMessages,
  updateMeetingId,
} from "../store/reducers/meetingReducer";
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
  DialogTitle,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { sortHelper } from "../shared/utils/sortHelper";
import { calculateTotalPrice } from "../shared/utils/calculator";
import { showAlertMessage } from "../store/reducers/alertReducer";
import DialogPopUp from "../shared/components/DialogPopUp";
import Chat from "../Chat/Chat";

let filteredAppointments = [];
let sumOfTotalPrice = 0;
export default function ColumnGroupingTable({ socket }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listData, setListData] = useState([]);
  const [show, setShow] = useState("Show Invoice");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [options, setOptions] = useState({
    sortName: "",
    desc: true,
    selectNameChoice: "",
    filterOption: new Set(),
    minPrice: "",
    maxPrice: "9999999999999",
  });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const { conversations } = useSelector((state) => state.meeting);
  const { meetingId } = useSelector((state) => state.meeting);
  const { appointments } = useSelector((state) => state.scheduler);
  const columns = [
    {
      id: "email",
      label: user.role === "consultant" ? "Client Email" : "Consultant Email",
      width: 150,
      align: "left",
    },
    {
      id: "peerName",
      label: user.role === "consultant" ? "Client Name" : "Consultant Name",
      width: 100,
      align: "left",
    },
    {
      id: "time",
      label: "Time",
      width: 100,
      align: "left",
    },
    {
      id: "description",
      label: "Description",
      minWidth: 150,
      align: "left",
      wordWrap: "break-word",
    },
    {
      id: "hourlyRate",
      label: "Hourly Rate",
      width: 150,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "totalPrice",
      label: "Total Price",
      width: 150,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "chatCount",
      label: "Messages",
      width: 150,
      align: "right",
    },
  ];
  useEffect(() => {
    filteredAppointments = filterAppointments(appointments, "Past");
    setListData(filteredAppointments);
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      setIsReady(true);
    }
  }, [appointments]);
  useEffect(() => {
    if (conversations.length > 0 && show !== "Show Invoice") {
      setOpen(true);
    }
  }, [conversations]);
  useEffect(() => {
    setListData(
      filterAppointmentsByOptions(
        filteredAppointments,
        options.filterOption,
        user.role,
        options.selectNameChoice,
        options.minPrice,
        options.maxPrice
      )
    );
  }, [options, setListData]);

  const sortedAppointments = sortHelper(
    listData,
    options.sortName,
    user.role,
    options.desc
  );

  const nameList = new Set();
  nameList.add("Show All");
  const data = listData.map((appointment) => {
    const totalCost = calculateTotalPrice(appointment);
    sumOfTotalPrice += totalCost;
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
      appointmentId: appointment.appointmentId,
      chatCount: appointment.chatCount,
    };
  });

  const handleSort = (event) => {
    const name = event.target.getAttribute("value");
    setOptions({
      ...options,
      desc: !options.desc,
      sortName: name,
    });
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
    setOptions({
      ...options,
      selectNameChoice: nameChoice,
      filterOption: options.filterOption.add("name"),
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
      filterOption: new Set(),
      minPrice: "",
      maxPrice: "999999999",
    });
    setListData(filterAppointments(appointments, "Past"));
  };

  const handleMaxPrice = () => {
    if (maxPrice === "") {
      setOptions({
        ...options,
        maxPrice: "999999999",
      });
    } else {
      setOptions({
        ...options,
        maxPrice: maxPrice,
        filterOption: options.filterOption.add("maxPrice"),
      });
    }
  };
  const handleMaxPriceOnChange = (event) => {
    const maxPrice = parseInt(event.target.value);
    if (isNaN(maxPrice)) {
      dispatch(showAlertMessage("Please enter a number"));
      setMaxPrice("");
    } else {
      setMaxPrice(maxPrice);
    }
  };
  const handleMinPrice = () => {
    if (minPrice === "") {
      setOptions({
        ...options,
        minPrice: 0,
      });
    } else {
      setOptions({
        ...options,
        minPrice: minPrice,
        filterOption: options.filterOption.add("minPrice"),
      });
    }
  };
  const handleMinPriceOnChange = (event) => {
    const minPrice = parseInt(event.target.value);
    if (isNaN(minPrice)) {
      dispatch(showAlertMessage("Please enter a number"));
      setMinPrice("");
    } else {
      setMinPrice(minPrice);
    }
  };
  const handleItemClick = async (event, appointmentId) => {
    updateMeetingId(appointmentId);
    await dispatch(getPastMessages(appointmentId));
  };
  const handleClose = () => {
    setOpen(false);
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
        {show !== "Show Invoice" && (
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
              onChange={handleMinPriceOnChange}
              onBlur={handleMinPrice}
              id="filled-basic"
              label="Min Total Price"
              variant="filled"
              value={minPrice}
            />
            <TextField
              id="filled-basic"
              label="Max Total Price"
              variant="filled"
              value={maxPrice}
              onChange={handleMaxPriceOnChange}
              onBlur={handleMaxPrice}
            />
          </Box>
        )}

        <Button
          disabled={!isReady}
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
        {show !== "Show Invoice" && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
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
                    {user.firstName} {user.lastName}
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
            {show !== "Show Invoice" &&
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      onClick={(e) => handleItemClick(e, row.appointmentId)}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      {columns.map((column) => {
                        if (column !== "appointmentId") {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <span>
                                {column.id !== "chatCount" &&
                                typeof value === "number"
                                  ? "$"
                                  : ""}
                                {column.id !== "chatCount" &&
                                column.format &&
                                typeof value === "number"
                                  ? column.format(value)
                                  : value}
                                {column.id === "chatCount" &&
                                  row.chatCount > 0 && <ChatIcon />}
                              </span>
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogPopUp maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Message History</DialogTitle>
        <Chat
          socket={socket}
          meetingId={meetingId}
          pastMessages={conversations ? conversations : []}
          isParentInvoice={true}
        />
      </DialogPopUp>
    </Paper>
  );
}
