import { Edit, Visibility, Delete, Update } from "@mui/icons-material";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const TableActions = ({
  viewAction,
  editAction,
  deleteAction,
  updateAction,
}) => {
  return (
    <>
      {viewAction && (
        <Tooltip title="View">
          <Button style={{ minWidth: 0 }} onClick={viewAction}>
            <Visibility style={{ color: "white" }} fontSize="small" />
          </Button>
        </Tooltip>
      )}
      {editAction && (
        <Tooltip title="Edit">
          <Button style={{ minWidth: 0 }} onClick={editAction}>
            <Edit style={{ color: "white" }} fontSize="small" />
          </Button>
        </Tooltip>
      )}
      {updateAction && (
        <Tooltip title="Update Datamodel">
          <Button style={{ minWidth: 0 }} onClick={updateAction}>
            <Update style={{ color: "white" }} fontSize="small" />
          </Button>
        </Tooltip>
      )}
      {deleteAction && (
        <Tooltip title="Delete">
          <Button style={{ minWidth: 0 }} onClick={deleteAction}>
            <Delete style={{ color: "white" }} fontSize="small" />
          </Button>
        </Tooltip>
      )}
    </>
  );
};

export default TableActions;
