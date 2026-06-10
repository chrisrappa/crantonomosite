import React, { useState } from 'react';
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
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function EmailSubmission(){
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subject, setSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('');
    } else if (!emailRegex.test(value)) {
      setEmailError('Must use a valid email');
    } else {
      setEmailError('');
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
    (subject !== 'other' ? true : customSubject) &&
    body;

  const handleSendEmail = async () => {
    setError('');
    setLoading(true);

    const finalSubject = subject === 'other' ? customSubject : subject;

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        setError('Sending failed, please try again');
      }
    } catch (err) {
      setError('Sending failed, please try again');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: `0 2px 8px ${theme.palette.divider || 'rgba(0,0,0,0.1)'}`,
          borderRadius: '12px',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.primary,
              textAlign: 'center',
              ...theme.typography.primaryFont,
              fontWeight: 500,
            }}
          >
            Thank you for your email, I&apos;ll be in touch within 72 hours.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 2px 8px ${theme.palette.divider || 'rgba(0,0,0,0.1)'}`,
        borderRadius: '12px',
        overflow: 'auto',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          height: '100%',
          padding: '32px',
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
              '& .MuiOutlinedInput-root': {
                color: theme.palette.text.primary,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: emailError ? '#d32f2f' : theme.palette.divider,
              },
            }}
          />
          {emailError && (
            <Typography
              sx={{
                color: '#d32f2f',
                fontSize: '0.75rem',
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
              setCustomSubject('');
              setError('');
            }}
            label="Subject"
            sx={{
              color: theme.palette.text.primary,
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
        {subject === 'other' && (
          <TextField
            fullWidth
            label="Custom Subject"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            disabled={loading}
            placeholder="Enter your custom subject"
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                color: theme.palette.text.primary,
              },
              '& .MuiOutlinedInput-notchedOutline': {
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
          rows={20}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={loading}
          placeholder="Enter your message here..."
          required
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              color: theme.palette.text.primary,
              height: '100%',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.divider,
            },
          }}
        />

        {/* Error Message */}
        {error && (
          <Typography
            sx={{
              color: '#d32f2f',
              fontSize: '0.875rem',
              mt: -1,
            }}
          >
            {error}
          </Typography>
        )}

        {/* Send Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: '#fff',
              textTransform: 'none',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingLeft: loading ? '16px' : '24px',
              '&:hover:not(:disabled)': {
                backgroundColor: theme.palette.primary.dark,
              },
              '&:disabled': {
                backgroundColor: theme.palette.primary.main + '60',
                color: '#fff',
              },
            }}
            disabled={loading || !isFormValid}
            onClick={handleSendEmail}
          >
            {loading && (
              <CircularProgress
                size={20}
                sx={{
                  color: '#fff',
                  marginRight: '8px',
                }}
              />
            )}
            Send
            {!loading && <SendIcon sx={{ fontSize: '1rem' }} />}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmailSubmission;