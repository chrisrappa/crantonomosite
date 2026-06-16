"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function EmailSubmission() {
  const theme = useTheme();
  const [isChromium] = useState(() => {
    if (typeof window === "undefined") return true;

    const userAgent = navigator.userAgent;
    const isChrome = /Chrome|Chromium|Opera/.test(userAgent);
    const isEdge = /Edg/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

    return (isChrome || isEdge) && !isFirefox && !isSafari;
  });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("");
    } else if (!emailRegex.test(value)) {
      setEmailError("Must use a valid email");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  // Check if form is valid
  const isFormValid =
    email &&
    emailRegex.test(email) &&
    subject &&
    (subject !== "other" ? true : customSubject) &&
    body;

  const handleSendEmail = async () => {
    setError("");
    setLoading(true);

    const finalSubject = subject === "other" ? customSubject : subject;

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: email,
          emailSubject: finalSubject,
          emailBody: body,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError("Sending failed, please try again");
      }
    } catch (err) {
      setError("Sending failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        {/* SVG Filter for Glass Morphism Effect - Chromium only */}
        {isChromium && (
          <svg style={{ display: "none" }}>
            <filter id="emailSubmissionDisplacementFilter">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                result="turbulence"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale="30"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>
        )}
        <Box
          sx={{
            position: "relative",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            overflow: "visible",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition:
              "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.26s ease-out",
            willChange: "backdrop-filter",
            WebkitWillChange: "backdrop-filter",
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
            isolation: "isolate",
            ...(isChromium
              ? {
                  // Chromium (Chrome, Edge, Opera): Full glass morphism with SVG
                  filter: "drop-shadow(-8px -10px 20px rgba(0, 0, 0, 0.31))",
                  WebkitFilter:
                    "drop-shadow(-8px -10px 20px rgba(0, 0, 0, 0.31))",
                  backdropFilter:
                    "brightness(1.05) blur(5px) url(#emailSubmissionDisplacementFilter)",
                  WebkitBackdropFilter:
                    "brightness(1.05) blur(5px) url(#emailSubmissionDisplacementFilter)",
                  boxShadow:
                    "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
                  WebkitBoxShadow:
                    "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
                }
              : {
                  // Firefox/Safari: Simpler styling without SVG
                  backdropFilter: "brightness(1.1) blur(8px)",
                  WebkitBackdropFilter: "brightness(1.1) blur(8px)",
                  boxShadow: `
                    inset 0 1px 3px rgba(255, 255, 255, 0.3),
                    inset 6px 6px 12px rgba(255, 255, 255, 0.2),
                    -8px -10px 20px rgba(0, 0, 0, 0.06)
                  `,
                  WebkitBoxShadow: `
                    inset 0 1px 3px rgba(255, 255, 255, 0.3),
                    inset 6px 6px 12px rgba(255, 255, 255, 0.2),
                    -8px -10px 20px rgba(0, 0, 0, 0.06)
                  `,
                }),
            "&::before": {
              content: "''",
              position: "absolute",
              inset: 0,
              zIndex: 0,
              overflow: "hidden",
              borderRadius: "12px",
              ...(isChromium
                ? {
                    boxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.3),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.2),
                  -8px -10px 20px rgba(0, 0, 0, 0.06)
                `,
                    WebkitBoxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.3),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.2),
                  -8px -10px 20px rgba(0, 0, 0, 0.06)
                `,
                  }
                : {
                    boxShadow: "none",
                    WebkitBoxShadow: "none",
                  }),
              pointerEvents: "none",
            },
            "&:hover": {
              transform: "translateY(-4px)",
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.primary,
                textAlign: "center",
                ...theme.typography.primaryFont,
                fontWeight: 500,
              }}
            >
              Thank you for your email, I&apos;ll be in touch within 72 hours.
            </Typography>
          </CardContent>
        </Box>
      </>
    );
  }

  return (
    <>
      {/* SVG Filter for Glass Morphism Effect - Chromium only */}
      {isChromium && (
        <svg style={{ display: "none" }}>
          <filter id="emailSubmissionDisplacementFilter">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          overflow: "visible",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition:
            "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.26s ease-out",
          willChange: "backdrop-filter",
          WebkitWillChange: "backdrop-filter",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          isolation: "isolate",
          ...(isChromium
            ? {
                // Chromium (Chrome, Edge, Opera): Full glass morphism with SVG
                filter: "drop-shadow(-8px -10px 20px rgba(0, 0, 0, 0.31))",
                WebkitFilter:
                  "drop-shadow(-8px -10px 20px rgba(0, 0, 0, 0.31))",
                backdropFilter:
                  "brightness(1.05) blur(5px) url(#emailSubmissionDisplacementFilter)",
                WebkitBackdropFilter:
                  "brightness(1.05) blur(5px) url(#emailSubmissionDisplacementFilter)",
                boxShadow:
                  "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
                WebkitBoxShadow:
                  "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
              }
            : {
                // Firefox/Safari: Simpler styling without SVG
                backdropFilter: "brightness(1) blur(6px)",
                WebkitBackdropFilter: "brightness(1) blur(6px)",
                boxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.1),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.1),
                  -8px -10px 20px rgba(0, 0, 0, 0.06)
                `,
                WebkitBoxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.1),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.1),
                  -8px -10px 20px rgba(0, 0, 0, 0.06)
                `,
              }),
          "&::before": {
            content: "''",
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
            borderRadius: "12px",
            ...(isChromium
              ? {
                  boxShadow:
                    "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.3), inset 0 0 1px 1px rgba(255, 255, 255, 0.2), -8px -10px 20px rgba(0, 0, 0, 0.06)",
                  WebkitBoxShadow:
                    "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.3), inset 0 0 1px 1px rgba(255, 255, 255, 0.2), -8px -10px 20px rgba(0, 0, 0, 0.06)",
                }
              : {
                  boxShadow: "none",
                  WebkitBoxShadow: "none",
                }),
            pointerEvents: "none",
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "32px",
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          {/* Email Input */}
          <Box>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={loading}
              placeholder="your.email@example.com"
              required
              error={Boolean(emailError)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.paper,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: emailError ? "#d32f2f" : theme.palette.divider,
                },
              }}
            />
            {emailError && (
              <Typography
                sx={{
                  color: "#d32f2f",
                  fontSize: "0.75rem",
                  mt: 0.5,
                }}
              >
                {emailError}
              </Typography>
            )}
          </Box>

          {/* Subject Dropdown */}
          <FormControl fullWidth disabled={loading} required>
            <InputLabel>Subject</InputLabel>
            <Select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setCustomSubject("");
                setError("");
              }}
              label="Subject"
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <MenuItem value="">
                <em>Select a subject</em>
              </MenuItem>
              <MenuItem value="Interview request">Interview request</MenuItem>
              <MenuItem value="general feedback">General feedback</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* Custom Subject Field (conditional) */}
          {subject === "other" && (
            <TextField
              fullWidth
              label="Custom Subject"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              disabled={loading}
              placeholder="Enter your custom subject"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.paper,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
              }}
            />
          )}

          {/* Email Body */}
          <TextField
            fullWidth
            label="Message"
            multiline
            minRows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={loading}
            placeholder="Enter your message here..."
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
                alignItems: "flex-start",
              },
              "& .MuiOutlinedInput-input": {
                verticalAlign: "top",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.divider,
              },
            }}
          />

          {/* Error Message */}
          {error && (
            <Typography
              sx={{
                color: "#d32f2f",
                fontSize: "0.875rem",
                mt: -1,
              }}
            >
              {error}
            </Typography>
          )}

          {/* Send Button */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                textTransform: "none",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingLeft: loading ? "16px" : "24px",
                "&:hover:not(:disabled)": {
                  backgroundColor: theme.palette.primary.dark,
                },
                "&:disabled": {
                  backgroundColor: theme.palette.primary.main + "60",
                  color: "#fff",
                },
              }}
              disabled={loading || !isFormValid}
              onClick={handleSendEmail}
            >
              {loading && (
                <CircularProgress
                  size={20}
                  sx={{
                    color: "#fff",
                    marginRight: "8px",
                  }}
                />
              )}
              Send
              {!loading && <SendIcon sx={{ fontSize: "1rem" }} />}
            </Button>
          </Box>
        </CardContent>
      </Box>
    </>
  );
}

export default EmailSubmission;
