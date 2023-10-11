/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable react/display-name */
import { ComponentPropsWithoutRef, ComponentType } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
import ErrorBoundaryComponent from '../../components/ErrorViews/ErrorBoundaryComponent';

export interface IErrorBoundaryProps {}

export interface ErrorComponentProps {
  error: Error;
  resetErrorBoundary: (...args: unknown[]) => void;
  props?: ComponentPropsWithoutRef<'div'>;
}
export function withErrorBoundary<T extends IErrorBoundaryProps>(
  Component: ComponentType<T>,
  options?: {
    errorComponent?: ComponentType<ErrorComponentProps>;
    errorComponentProps?: ComponentPropsWithoutRef<'div'>;
  }
): React.FC<Omit<T, keyof IErrorBoundaryProps>> {
  return (hocProps: Omit<T, keyof IErrorBoundaryProps>) => {
    return (
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => {
              if (options?.errorComponent) {
                const ErrorComponent = options.errorComponent;
                return (
                  <ErrorComponent
                    error={error}
                    resetErrorBoundary={resetErrorBoundary}
                    props={options?.errorComponentProps}
                  />
                );
              }
              return (
                <ErrorBoundaryComponent
                  resetErrorBoundary={resetErrorBoundary}
                  error={error}
                  props={options?.errorComponentProps}
                />
              );
            }}
            onReset={reset}
          >
            <Component {...(hocProps as T)} />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    );
  };
}
