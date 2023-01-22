import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import _ from "lodash";
import api from "../../../services/api";
import { UserContext } from "../../../UserContext";
import tableColumns from "./tableColumns";
import Loading from "../../../components/Loading/Loading";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const { user } = useContext(UserContext);

  const columns = tableColumns();

  useEffect(() => {
    const fetchUsers = async () => {
      const results = await api.get("/api/v1/users");
      const filteredColumns = columns.map((item) => item.field);
      const rows = results.data
        .map((item) => _.pick(item, filteredColumns))
        .filter((item) => item["id"] !== user.id);
      setRows(rows);
    };

    fetchUsers().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div style={{ width: "100%" }}>
      <Typography variant="h4" marginBottom="10px">
        Users
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30]}
        pagination
        autoHeight
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default Users;
