import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import _ from "lodash";
import inventory_api from "../../../services/inventory_api";
import { UserContext } from "../../../UserContext";
import tableColumns from "./tableColumns";
import Loading from "../../../components/Loading/Loading";

const Inventory = () => {
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const columns = tableColumns(navigate);

  useEffect(() => {
    const fetchUsers = async () => {
      const results = await inventory_api.get("/api/v1/inventory");
      const filteredColumns = columns.map((item) => item.field);
      const rows = results.data
        .map((item) => _.pick(item, filteredColumns))
        .filter((item) => item["user_id"] !== user.id);
      setRows(rows);
    };

    fetchUsers().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div style={{ width: "100%" }}>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Products for Sale</Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/myinventory");
          }}
        >
          View My Inventory
        </Button>
      </div>

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

export default Inventory;
