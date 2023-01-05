import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import axios from "axios";

import { useState, useRef, ChangeEvent, FormEvent, MouseEvent } from "react";

const Calculator = (): JSX.Element => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const [firstError, setFirstError] = useState("");
  const [secondError, setSecondError] = useState("");
  const [operError, setOperError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
  };

  interface MyForm extends EventTarget {
    first: HTMLInputElement;
    second: HTMLInputElement;
  }

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as MyForm;
    const errorMessage = "Not a number or empty";
    let error = false;
    const query = {
      operation: operation,
      first: target.first.value,
      second: target.second.value,
    };
    if (!isInputValid(query.first)) {
      setFirstError(errorMessage);
      error = true;
    }
    if (!isInputValid(query.second)) {
      setSecondError(errorMessage);
      error = true;
    }
    if (!query.operation) {
      setOperError("Choose an operation");
      error = true;
    }

    if (!error) {
      axios
        .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
        .then((res) => {
          setResult(res.data.result);
        })
        .catch((err) => {
          setResult(err.response.data.message);
        });
    }
  };

  const isInputValid = (value: string): boolean => {
    if (value.length === 0 || isNaN(Number(value))) {
      return false;
    }
    return true;
  };

  const resetTheInput = (e) => {

    if (e.target.name === "first" && !isInputValid(e.target.value)) {
      setFirst("");
      setFirstError("");
    }
    if (e.target.name === "second" && !isInputValid(e.target.value)) {
      setSecond("");
      setSecondError("");
    }

    if (e.target.name === "operation" && !isInputValid(e.target.value)) {
      setOperError("");
    }
  };

  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="first"
              name="first"
              value={first}
              label="First Number"
              variant="outlined"
              onClick={(e) => resetTheInput(e)}
              onChange={(e) => setFirst(e.target.value)}
              error={!!firstError}
              helperText={firstError || ""}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              input={
                <OutlinedInput
                  error={!!operError}
                  onClick={(e) => resetTheInput(e)}
                />
              }
              defaultValue={""}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
            >
              <option value="">Op</option>
              <option value={"add"}>+</option>
              <option value={"subtract"}>-</option>
              <option value={"multiply"}>*</option>
              <option value={"divide"}>/</option>
            </NativeSelect>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="second"
              name="second"
              value={second}
              label="Second Number"
              variant="outlined"
              onClick={(e) => resetTheInput(e)}
              onChange={(e) => setSecond(e.target.value)}
              error={!!secondError}
              helperText={secondError || ""}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl fullWidth>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" gutterBottom id="result">
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
};
export default Calculator;
