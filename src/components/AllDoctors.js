import { Chip } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getAllUsersAPI } from '../actions/users.actions';

const columns = [
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'email', headerName: 'Email', width: 300 },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: (params) => {
      if (params.value === 'pending') {
        return <Chip variant="contained" color="secondary" label="Pending" />;
      }
      if (params.value === 'approved') {
        return <Chip variant="contained" color="success" label="Approved" />;
      }
      if (params.value === 'rejected') {
        return <Chip variant="contained" color="error" label="Rejected" />;
      }
    },
  },
  {
    field: 'id',
    headerName: 'Link to Open',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <Button variant="contained">
        <Link className="link white" to={`allDoctors/${params.row.id}`}>
          Open
        </Link>
      </Button>
    ),
  },
];

const AllDoctors = () => {
  const { data } = useQuery('getAllUser', () => getAllUsersAPI('doctor'));
  const rows = [];
  data?.forEach((element) => {
    rows.push({
      id: element.userId,
      firstName: element.firstName,
      lastName: element.lastName,
      email: element.email,
      status: element.status,
    });
  });

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default AllDoctors;
