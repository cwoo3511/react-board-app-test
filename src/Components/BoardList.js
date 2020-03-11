import React, { /* Component */ } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableFooter, Grid,
  TablePagination, TableRow, Paper, IconButton, TableHead, Button
} from '@material-ui/core'
import {
  KeyboardArrowLeft, KeyboardArrowRight
} from '@material-ui/icons'
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import {
  useHistory, useLocation
} from "react-router-dom";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const columns = [
  {
    id: 'title', label: 'Title', minWidth: '*',
    align: 'left', width: '*'
  },
  {
    id: 'writer', label: 'writer', minWidth: 100,
    align: 'right', width: '20%'
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 100, width: '20%',
    align: 'right',
    format: value => value.toLocaleString(),
  },
];

const useStyles2 = makeStyles(theme =>({
  tableContainer: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 500,
  },
  link: {
    cursor: 'pointer',
  }
}));

export default function CustomPaginationActionsTable() {
  let location = useLocation();
  const rows = location.state.rows;

  let history = useHistory();
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Grid container spacing={2} className={classes.buttonGroub} >
        <Grid item xs={10} lg={10}>
        </Grid>

        <Grid item xs={2} lg={2}>
          <Button variant="contained" color="primary" size="large"
            fullWidth
                  onClick={() => history.push({
                      pathname: '/main/boardList/detail',
                      state: {
                        index: -1,
                        code: rows[0].code,
                        title: '',
                        writer: '',
                        date: '',
                        content: ''
                      }
                  })}
          >
            Write
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="custom pagination table">
          
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{
                  minWidth: column.minWidth,
                  width: column.width
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
          
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={row.code}>
                <TableCell className={classes.link} scope="row"
                  onClick={() => history.push({
                      pathname: '/main/boardList/detail',
                      state: {
                        index: index,
                        code: row.code,
                        title: row.title,
                        writer: row.writer,
                        date: row.date,
                        content: row.content
                      }
                  })}
                >
                  {row.code}
                </TableCell>
                <TableCell align="right">{row.writer}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}