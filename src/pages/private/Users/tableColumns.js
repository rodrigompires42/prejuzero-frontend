const tableColumns = () => [
  { field: "id", headerName: "ID", width: 50, hide: true },
  { field: "name", headerName: "Name", flex: 5 },
  { field: "email", headerName: "Email", flex: 5 },
  { field: "phone", headerName: "Phone", flex: 3 },
  { field: "region", headerName: "Region", flex: 3 },
];

export default tableColumns;
