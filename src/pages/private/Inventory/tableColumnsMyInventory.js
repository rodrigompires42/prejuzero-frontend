import TableActions from "../../../components/Table/TableActions";

const tableColumns = (navigate, setSelected, handleDelete) => [
  { field: "id", headerName: "ID", width: 50, hide: true },
  { field: "user_id", headerName: "User ID", flex: 5, hide: true },
  { field: "product_description", headerName: "Product", flex: 4 },
  { field: "quantity", headerName: "Quantity", flex: 1 },
  { field: "measure", headerName: "Measure", flex: 1 },
  { field: "price", headerName: "Price", flex: 1 },
  {
    field: "action",
    headerName: "Actions",
    headerAlign: "center",
    align: "center",
    sortable: false,
    renderCell: (params) => (
      <TableActions
        editAction={() => {
          navigate(`/inventory/${params.row.id}`);
        }}
        deleteAction={() => {
          setSelected(params.row.id);
          handleDelete(params.row.id);
        }}
      />
    ),
    flex: 1,
  },
];

export default tableColumns;
