import React, { useState } from "react";

import api from "../api";
import { Button } from "@mui/material";
import { RestartAlt } from "@mui/icons-material";

const ResetButton = ({ reset_topic }) => {
  // const [id, setId] = useState(reset_topic);
  // console.log(reset_topic);

  const handleButtonClick = () => {
    // Kirim reset_topic `id` ke server
    api
      .post("/esp/reset", { reset_topic })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div key={reset_topic}>
      <Button
        onClick={handleButtonClick}
        variant="contained"
        endIcon={<RestartAlt />}
        size="small"
      >
        Reset
      </Button>
    </div>
  );
};

export default ResetButton;
