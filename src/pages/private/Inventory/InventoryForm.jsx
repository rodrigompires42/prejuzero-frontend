import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

import inventory_api from "../../../services/inventory_api";
import api from "../../../services/api";

import { UserContext } from "../../../UserContext";

import Loading from "../../../components/Loading/Loading";

const InventoryForm = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [inventoryInfo, setInventoryInfo] = useState({
    user_id: 0,
    product_description: "",
    quantity: 0,
    measure: "",
    price: 0,
  });
  const [vendorInfo, setVendorInfo] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    region: "",
  });

  useEffect(() => {
    setLoading(true);
    if (params.inventoryId) {
      const fetchInventory = async () => {
        const result = await inventory_api.get(
          `/api/v1/inventory/${params.inventoryId}`
        );
        setInventoryInfo(result.data);
        if (user.id !== result.data.user_id) {
          const user_result = await api.get(
            `/api/v1/users/${result.data.user_id}`
          );
          setVendorInfo(user_result.data);
        }
      };

      fetchInventory().then(() => setLoading(false));
    } else {
      setInventoryInfo((values) => ({ ...values, user_id: user.id }));
    }
    setLoading(false);
  }, [params.inventoryId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let promise = null;

    if (params.inventoryId) {
      promise = inventory_api.put(
        `/api/v1/inventory/${params.inventoryId}`,
        inventoryInfo
      );
    } else {
      promise = inventory_api.post("/api/v1/inventory", inventoryInfo);
    }

    promise
      .then(() => {
        navigate("/myinventory");
      })
      .catch((error) => {
        console.log(error.response.data.detail);
        alert(error.response.data.detail);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    let value = 0;
    if (event.target.type === "number") {
      value = parseInt(event.target.value, 10);
      value = isNaN(value) ? 0 : value;
    } else {
      value = event.target.value;
    }
    setInventoryInfo((values) => ({ ...values, [name]: value }));
  };

  return loading ? (
    <Loading />
  ) : (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {params.inventoryId ? "Poduct Details" : "New Product for Sale"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                InputLabelProps={{
                  required: true,
                }}
                value={inventoryInfo.product_description || ""}
                onChange={handleChange}
                id="product_description"
                label="Product Description"
                autoFocus
                name="product_description"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                required
                InputProps={{
                  inputProps: {
                    max: 999,
                    min: 0,
                  },
                }}
                InputLabelProps={{
                  required: true,
                }}
                fullWidth
                value={Number(inventoryInfo.quantity).toString()}
                onChange={handleChange}
                name="quantity"
                label="Quantity"
                type="number"
                id="quantity"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                InputLabelProps={{
                  required: true,
                }}
                required
                fullWidth
                value={inventoryInfo.measure || ""}
                onChange={handleChange}
                name="measure"
                label="Measure"
                type="measure"
                id="measure"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                InputProps={{
                  inputProps: {
                    max: 999,
                    min: 0,
                  },
                }}
                InputLabelProps={{
                  required: true,
                }}
                fullWidth
                value={Number(inventoryInfo.price).toString()}
                onChange={handleChange}
                name="price"
                label="Price"
                type="number"
                id="price"
              />
            </Grid>
          </Grid>

          {user.id === inventoryInfo.user_id && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {params.inventoryId ? "Update Inventory" : "Submit Inventory"}
            </Button>
          )}

          {params.inventoryId && user.id !== inventoryInfo.user_id && (
            <div style={{ marginTop: 24 }}>
              <Typography variant="h5">Vendor details</Typography>
              <Grid container spacing={2} marginTop={1}>
                <Grid item sm={6}>
                  <Typography variant="h6">
                    Name: <b>{vendorInfo.name}</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant="h6">
                    Phone: <b>{vendorInfo.phone}</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant="h6">
                    Email: <b>{vendorInfo.email}</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant="h6">
                    Region: <b>{vendorInfo.region}</b>
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default InventoryForm;
