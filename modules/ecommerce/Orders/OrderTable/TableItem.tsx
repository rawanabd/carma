import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import useStyles from './TableItem.style';
import OrderActions from './OrderActions';
import {RecentOrders} from '../../../../types/models/ecommerce/EcommerceApp';

interface TableItemProps {
  data: RecentOrders;
}

const TableItem: React.FC<TableItemProps> = ({data}) => {
  const classes = useStyles();
  const getPaymentStatusColor = () => {
    switch (data.status) {
      case 'Pending': {
        return '#F84E4E';
      }
      case 'Delivered': {
        return '#43C888';
      }
      default: {
        return '#E2A72E';
      }
    }
  };

  return (
    <TableRow key={data.id} className='item-hover'>
      <TableCell component='th' scope='row' className={classes.tableCell}>
        <Box className={classes.anchar}>{data.id}</Box>
      </TableCell>
      <TableCell
        align='left'
        className={clsx(classes.tableCell, classes.tableCell)}>
        {data.product}
      </TableCell>
      <TableCell
        align='left'
        className={clsx(classes.tableCell, classes.tableCell)}>
        {data.customer}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.date}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.price}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.paymentType}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <Box
          className={classes.badgeRoot}
          style={{
            color: getPaymentStatusColor(),
            backgroundColor: getPaymentStatusColor() + '44',
          }}>
          {data.status}
        </Box>
      </TableCell>
      <TableCell align='right' className={classes.tableCell}>
        <OrderActions />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
