# Getting Started with Dark/ Light Theme

This project was bootstrapped with [create-react-app my-app --template typescript](https://create-react-app.dev/docs/adding-typescript/).

clone this repo with "git clone" or download it.
-> open terminal locate folder
-> run "npm install" (this will download all required libraries)
-> run "npm start" (this will start development server on port: 3000)

## Prerequisites

node version 10.0.0 < node && LATEST <= node
download latest [node version](https://nodejs.org/en/download/)

## prefers-color-scheme

The prefers-color-scheme CSS media feature is used to detect if the user has requested the system use a light or dark color theme.

### Syntax
@media (prefers-color-scheme: dark) {
  body  { background:  #333; color: white; }
}

@media (prefers-color-scheme: light) {
  body  { background: white; color:  #555; }
}