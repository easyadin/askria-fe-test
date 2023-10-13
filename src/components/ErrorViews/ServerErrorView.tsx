import { ErrorComponentProps } from '../../lib/HOCs/withErrorBoundary';
import { Button, Flex, Alert } from 'antd';
import Title from 'antd/es/typography/Title';

const ServerErrorView = ({
  error,
  props,
  resetErrorBoundary,
}: ErrorComponentProps) => {
  console.log({ error });

  return (
    <Flex
      align='center'
      justify='center'
      style={{
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f7f9fc',
        padding: '20px',
      }}
      {...props}
    >
      <img
        src='https://loremflickr.com/320/240'
        alt='Something went wrong'
        style={{
          marginBottom: '20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      />

      <Alert
        message={
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
            Network Error
          </span>
        }
        description={
          <>
            <p>This part of the page is only testable offline. To test:</p>
            <ol>
              <li>
                <strong>Clone</strong> the project. {''}
                <code>https://github.com/easyadin/askria-fe-test</code>
              </li>
              <li>
                <strong>Install</strong> dependencies.
              </li>
              <li>
                <strong>Install</strong> mock server:
                <a
                  href='https://docs.stoplight.io/docs/prism/f51bcc80a02db-installation'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Documentation
                </a>
              </li>
              <li>
                <strong>Run</strong> the server against the YAML file with:
                <code>prism mock mock_api.yaml</code>
              </li>
              <li>
                <strong>
                  Set Environment Variables: Replace values with mock server
                  output
                </strong>
                <div>
                  <code>
                    VITE_APP_BASE_API=http://127.0.0.1:4010/api
                    VITE_APP_BASE_API_GET_ENDPOINT=/875.948497485563/programs/expedita/application-form
                    VITE_APP_BASE_API_PUT_ENDPOINT=/878.317361550955/programs/animi/application-form
                  </code>
                </div>
              </li>
            </ol>
          </>
        }
        type='error'
        showIcon
        style={{
          marginBottom: '20px',
          maxWidth: '1000px',
          width: '100%',
          border: '1px solid #f5222d',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      />

      <Title
        level={2}
        style={{ color: '#333', marginBottom: '20px', fontSize: '1rem' }}
      >
        Oops, Someone unplugged the cable! Please try again
      </Title>

      <Button
        type='primary'
        onClick={() => {
          if (
            error instanceof Error &&
            error.message ===
              'Failed loading page, Please refresh your browser window'
          ) {
            return window.location.reload();
          }
          resetErrorBoundary();
        }}
      >
        Try again
      </Button>
    </Flex>
  );
};

export default ServerErrorView;
