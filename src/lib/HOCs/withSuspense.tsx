/* eslint-disable react/display-name */
import { ComponentType, Suspense } from 'react';

interface WithSuspenseOptions {
    fallBackComponent: JSX.Element;
    wrapper?: ComponentType | (() => JSX.Element) | any;
}

export function withSuspense(
    Component: ComponentType,
    {
        fallBackComponent: FallbackComponent,
        wrapper: Wrapper,
    }: WithSuspenseOptions
) {
    return (hocArgs: any) => {
        if (Wrapper) {
            return (
                <Wrapper>
                    <Suspense fallback={FallbackComponent}>
                        <Component {...hocArgs} />
                    </Suspense>
                </Wrapper>
            );
        }
        return (
            <Suspense fallback={FallbackComponent}>
                <Component {...hocArgs} />
            </Suspense>
        );
    };
}
