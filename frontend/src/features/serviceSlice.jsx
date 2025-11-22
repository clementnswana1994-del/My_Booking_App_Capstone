import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// create service
export const createService = createAsyncThunk(
  "service/create",
  async (serviceData, thunkApi) => {
    try {
      const res = await fetch("/api/services", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(serviceData),
      });

      if (!res.ok) {
        const error = await res.json();
        return thunkApi.rejectWithValue(error);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// get all service
export const getServices = createAsyncThunk("service/getall", async (_, thunkApi) => {
  try {
    const res = await fetch("/api/service");
    if (!res.ok) {
      const error = await res.json();
      return thunkApi.rejectWithValue(error);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return thunkApi.rejectWithValue(error.message);
  }
});

// update service
export const updateService = createAsyncThunk(
  "/service/update",
  async (serviceData, thunkApi) => {
    try {
      const { serviceId, ...rest } = serviceData;
      const res = await fetch(`/api/services/${serviceId}`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(rest),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteService = createAsyncThunk(
  "service/delete",
  async (serviceId, thunkApi) => {
    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // add cases here
    builder
      .addCase(createService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.services = action.payload;
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.services = state.services.filter(
          (service) => service._id != action.payload.id
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = serviceSlice.actions;
export default serviceSlice.reducer;