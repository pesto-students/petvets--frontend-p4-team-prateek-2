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
    flex: 1,
    headerAlign: 'center',
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    headerAlign: 'center',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    headerAlign: 'center',
    renderCell: (params) => {
      if (params.value === 'pending') {
        return (
          <div
            style={{
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Chip variant="contained" color="secondary" label="Pending" />
          </div>
        );
      }
      if (params.value === 'approved') {
        return (
          <div
            style={{
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Chip variant="contained" color="success" label="Approved" />
          </div>
        );
      }
      if (params.value === 'rejected') {
        return (
          <div
            style={{
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Chip variant="contained" color="error" label="Rejected" />
          </div>
        );
      }
    },
  },
  {
    field: 'id',
    headerName: 'Link to Open',
    headerAlign: 'center',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    // width: 150,
    renderCell: (params) => (
      <div
        style={{
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Button variant="contained">
          <Link className="link white" to={`allDoctors/${params.row.id}`}>
            Open
          </Link>
        </Button>
      </div>
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
