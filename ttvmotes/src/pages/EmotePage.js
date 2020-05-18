/* global chrome */

import React, { useState, useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchBar from '../components/SearchBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from "@material-ui/core/TablePagination";
import IOSSwitch from '../components/IOSSwitch';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import { tableHeight, popupHeight } from '../constants';

const columns = [
    {
        id: "name",
        label: "Name",
        minWidth: 100,
        align: "center"
    },
    {
        id: "emote",
        label: "Emote",
        minWidth: 50,
        align: "center"
    },
    {
        id: "source",
        label: "Source",
        minWidth: 100,
        align: "center"
    },
    {
        id: "toggle",
        label: "Toggle",
        minWidth: 70,
        align: "center"
    }
];

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    tableContainer: {
        maxHeight: tableHeight
    },
    tableFooter: {
        backgroundColor: "#FAFAFA"
    },
    tablePaperContainer: {
        height: popupHeight
    },
    nameColumn: {
        maxWidth: 100
    }
});

export default function EmotePage() {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [emotesList, setEmotesList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [emoteDetailsList, setEmoteDetailsList] = useState([]);

    const handleSearchInput = (e) => {
        var value = e.target.value;
        setSearchQuery(value);
        var filtered = emotesList.filter(emote => {
            return emote.toLowerCase().includes(value.toLowerCase())
        })
        setFilteredList(filtered);
        setCurrentPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setCurrentPage(0);
    };

    const handleToggleChange = (event, newValue) => {
        var emote = event.target.name;
        var details = emoteDetailsList[emote]
        details["enabled"] = newValue
        setEmoteDetailsList(Object.assign({}, emoteDetailsList, { flag: false }))
        chrome.storage.local.set({ [emote]: details }, () => {
            console.log("toggled emote successfully")
        })
    }

    // Component will mount
    useEffect(() => {
        chrome.storage.local.get(null, (emotes) => {
            var keys = Object.keys(emotes)
            setEmoteDetailsList(emotes);
            setEmotesList(keys);
            setFilteredList(keys);
            setLoading(false);
        })
    }, []);

    const chipMap = {
        "bttv":
            <Paper variant="outlined" style={{ borderColor: "#FE938C", color: "#FE938C" }}>
                <Typography variant="caption" >
                    <div style={{ textColor: "#FE938C" }}>BetterTTV</div>
                </Typography>
            </Paper>,
        "ttv":
            <Paper variant="outlined" style={{ borderColor: "#8338ec", color: "#8338ec" }} >
                <Typography variant="caption" >
                    <div style={{ textColor: "#8338ec" }}>Twitch</div>
                </Typography>
            </Paper>,
        "ffz":
            <Paper variant="outlined" style={{ borderColor: "#4281A4", color: "#4281A4" }}>
                <Typography variant="caption">
                    <div style={{ textColor: "#4281A4" }}>FrankerFaceZ</div>
                </Typography>
            </Paper>
    }

    return (
        <React.Fragment>
            {loading
                ?
                <Backdrop open={loading}>
                    <CircularProgress />
                </Backdrop>
                :
                <Paper className={classes.tablePaperContainer} variant="outlined" square>
                    <SearchBar handleSearchInput={handleSearchInput} searchQuery={searchQuery} />
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ maxWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredList
                                    .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                                    .map(row => {
                                        var emoteDetails = emoteDetailsList[row]
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                <TableCell key="name" align="center" className={classes.nameColumn}>
                                                    {row}
                                                </TableCell>
                                                <TableCell key="emote" align="center">
                                                    <img src={emoteDetails["source"]}></img>
                                                </TableCell>
                                                <TableCell key="source" align="center">
                                                    {chipMap[emoteDetails["class"]]}
                                                </TableCell>
                                                <TableCell key="toggle" align="center">
                                                    <IOSSwitch checked={emoteDetailsList[row]["enabled"]} onChange={handleToggleChange} name={row} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={filteredList.length}
                        rowsPerPage={rowsPerPage}
                        page={currentPage}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        className={classes.tableFooter}
                    />
                </Paper>
            }
        </React.Fragment>
    )
}
