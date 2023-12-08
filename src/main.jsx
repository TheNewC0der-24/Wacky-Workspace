import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./main.css"
import { AuthProvider } from './Context/AuthContext.jsx'
import { theme } from "./Theme/theme.js";

import { ThemeProvider } from "@mui/material/styles";
import { SearchProvider } from './Context/SearchContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AuthProvider>
  </ThemeProvider>,
)
