import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const SimpleTable = ({ classes, columns, rows }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {columns.map(item => (<TableCell>{item.title}</TableCell>))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            {columns.map((item, index) => (index === 0 ?
              (<TableCell key={item.name} component="th" scope="row" >{row[item.name]}</TableCell>) :
              (<TableCell key={item.name}>{item.formatter ? item.formatter(row[item.name]) : row[item.name]}</TableCell>)
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
