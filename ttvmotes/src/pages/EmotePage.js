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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    container: {
        maxHeight: 300
    }
});

const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "emote", label: "Emote", minWidth: 100 }
    // {
    //     id: "population",
    //     label: "Population",
    //     minWidth: 170,
    //     align: "right",
    //     format: value => value.toLocaleString("en-US")
    // },
    // {
    //     id: "size",
    //     label: "Size\u00a0(km\u00b2)",
    //     minWidth: 170,
    //     align: "right",
    //     format: value => value.toLocaleString("en-US")
    // },
    // {
    //     id: "density",
    //     label: "Density",
    //     minWidth: 170,
    //     align: "right",
    //     format: value => value.toFixed(2)
    // }
];

export default function EmotePage(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [emotesList, setEmotesList] = React.useState([]);
    const [filteredList, setFilteredList] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleSearchInput = (e) => {
        var value = e.target.value;
        setSearchQuery(value);
        console.log(value)
        var filtered = emotesList.filter(emote => {
            return emote.toLowerCase().includes(value.toLowerCase())
        })
        setFilteredList(filtered)
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setCurrentPage(0);
    };

    useEffect(() => {
        // chrome.storage.local.get(null, (emotes) => {
        //     console.log(emotes)
        //     this.setState({
        //         emotesList: Object.keys(emotes),
        //         loading: false
        //     })
        // })
        var list = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9"]
        setEmotesList(list);
        setFilteredList(list)
        setLoading(false);
    }, []);

    return (
        <div>
            {loading
                ?
                <Backdrop open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                :
                <div>
                    <Paper className={classes.root}>
                        <SearchBar handleSearchInput={handleSearchInput} searchQuery={searchQuery} />

                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map(column => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
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
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map(column => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === "number"
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
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
                        />
                    </Paper>
                </div>
            }
        </div>
    )
}
