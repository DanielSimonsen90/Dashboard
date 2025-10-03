import { ReactNode, useState, useEffect } from "react";

type Props<T> = {
  /**
   * Callback that runs to resolve promised data.
   * The resolved data is passed to the children render prop.
   * @returns A promise that resolves to the data to be passed to the children render prop
   */
  run: () => Promise<T>;

  /**
   * Render prop that receives the resolved data.
   * @param data The data resolved by the `run` prop
   * @returns The content to render once the data has been resolved
   */
  children: (data: T) => ReactNode;

  loading?: ReactNode;
};

export default function Suspense<T>({ run, loading, children }: Props<T>) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    // Suspense component could be expanded to support ErrorBoundary to avoid unhandled promise rejections and other error handling
    run().then(setData);
  }, [run]);

  // While data is being processed, render optional loading prop or default to simple "Loading..."
  if (data === null) return <>{loading || 'Loading...'}</>;

  // Once data is resolved, render the children with the resolved data
  return <>{children(data)}</>;
}