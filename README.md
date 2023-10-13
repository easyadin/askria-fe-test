# Application Template UI Project

This project involves implementing a specified API to create a UI for an application template as per the provided design. The tech stack includes React JS and TypeScript. The final submission will be a GitHub repository containing the implemented code.

## Live Demo

See the live view of the project [here](https://askria-fe-test.vercel.app/).


## Starting the project

1. **Clone the repository**
   
2. **Navigate to the project directory**
    ```bash
    cd askria-fe-test
    ```

3. **Install dependencies and start the project**
    ```bash
    npm i && npm run dev
    ```

## Setting Up and Starting the API server

To get the API server up and running, follow these instructions:

### 1. **Install Prism**

Prism is a tool to mock, validate, and test API specifications. Installation instructions can be found [here](https://docs.stoplight.io/docs/prism/f51bcc80a02db-installation).

Install Prism using npm:
    ```bash
    npm install -g @stoplight/prism-cli
    ```
Or using yarn:
    ```bash
    yarn global add @stoplight/prism-cli
    ```

### 2. **Start the Mock server**

Run the mock server against the provided YAML file:
    ```bash
    prism mock mock_api.yaml
    ```

### 3. **Set Environment Variables**

For the application to connect to the mock server, you need to set the following environment variables. Replace the current values with the mock server output:

- `VITE_APP_BASE_API=http://127.0.0.1:4010/api`
- `VITE_APP_BASE_API_GET_ENDPOINT=/875.948497485563/programs/expedita/application-form`
- `VITE_APP_BASE_API_PUT_ENDPOINT=/878.317361550955/programs/animi/application-form`

