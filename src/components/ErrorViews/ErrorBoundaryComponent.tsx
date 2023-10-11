import axios from 'axios';
import { useCallback } from 'react';
import { ErrorComponentProps } from '../../lib/HOCs/withErrorBoundary';
import NotFoundView from './NotFoundView';
import ServerErrorView from './ServerErrorView';

const ErrorBoundaryComponent = ({
  error,
  resetErrorBoundary,
  props,
}: ErrorComponentProps) => {
  const renderError = useCallback(() => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return (
          <NotFoundView
            props={props}
            error={error}
            resetErrorBoundary={resetErrorBoundary}
          />
        );
      }

      return <ServerErrorView />;
    } else {
      return <ServerErrorView />;
    }
  }, [error, props, resetErrorBoundary]);
  return <>{renderError()}</>;
};

export default ErrorBoundaryComponent;
