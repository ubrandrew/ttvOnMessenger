/* global chrome */

import React from 'react';
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
import Pagination from "@material-ui/lab/Pagination";


/*
First, get filtered list
*/

export default class EmotePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emotesList: [],
            filteredList: [],
            filters: [],
            searchQuery: "",
            currentPage: 0,
            totalPages: 0,
            loading: true
        }
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    handleSearchInput(e) {
        var value = e.target.value;
        console.log(e)
        this.setState({
            searchQuery: value
        })
        console.log(this.state.searchQuery)
    }

    componentDidMount() {
        chrome.storage.local.get(null, (emotes) => {
            console.log(emotes)
            this.setState({
                emotesList: Object.keys(emotes),
                loading: false
            })
        })
    }

    render() {

        const filteredEmotes = this.state.emotesList.filter(emote => {
            return emote.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        })
        const paginatedEmotes = [];
        while (filteredEmotes.length) paginatedEmotes.push(filteredEmotes.splice(0, 5));
        return (
            <div>
                {this.state.loading
                    ?
                    <Backdrop open={this.state.loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    :
                    <div>
                        <SearchBar handleSearchInput={this.handleSearchInput} searchQuery={this.state.searchQuery} />
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Emote Name</TableCell>
                                        {/* <TableCell align="right">Emote</TableCell>
                                        <TableCell align="right">Class</TableCell>
                                        <TableCell align="right">Toggle</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedEmotes[this.state.currentPage] && paginatedEmotes[this.state.currentPage].map((row) => (
                                        <TableRow key={row}>
                                            <TableCell component="th" scope="row">
                                                {row}
                                            </TableCell>
                                            {/* <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell> */}
                                        </TableRow>
                                    ))}
                                    {!paginatedEmotes[this.state.currentPage] && <div>No emotes to show</div>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Pagination count={10} shape="rounded" />
                    </div>
                }
            </div>
        )
    }
}