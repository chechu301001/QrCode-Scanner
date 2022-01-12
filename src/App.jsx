import React, { useState, useRef } from "react";
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";

function App() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const qrRef = useRef();
  const classes = useStyles();

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  return (
    <>
      <Container className={classes.container}>
        <Card>
          <h1 className={classes.title}>Generate Downlaod and Scan QR Code</h1>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <TextField
                  label="Enter Text Here"
                  variant="filled"
                  onChange={(e) => setText(e.target.value)}
                />
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  onClick={() => generateQrCode()}>
                  Generate
                </Button>
                <br />
                <br />
                <br />
                {imageUrl ? (
                  <a href={imageUrl} download>
                    <img className="qrimg" src={imageUrl} alt="img" />
                  </a>
                ) : null}
                {imageUrl ? <h2>Click on the QR Code to download it</h2> : null}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="secondary"
                  onClick={() => onScanFile()}>
                  Scan QRCode
                </Button>
                <QrReader
                  ref={qrRef}
                  delay={300}
                  style={{ width: "100%" }}
                  onError={handleErrorFile}
                  onScan={handleScanFile}
                  legacyMode
                />
                <h2>Scanned code: {scanResultFile}</h2>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <h2>QRCode Scan by Web Cam</h2>
                <QrReader
                  delay={300}
                  style={{ width: "100%" }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                />
                <h2>Scanned WebCam Code: {scanResultWebCam}</h2>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F2C67",
    color: "#FFFFFF",
    padding: 20,
    marginTop: 0,
  },
  btn: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

export default App;
