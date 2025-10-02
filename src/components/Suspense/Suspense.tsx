import { ReactNode, useState, useEffect } from "react";

type Props<T> = {
  run: () => Promise<T>;
  loading?: ReactNode;
  children: (data: T) => ReactNode;
};

export default function Suspense<T>({ run, loading, children }: Props<T>) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    run().then(setData);
  }, [run]);

  if (data === null) return <>{loading || 'Loading...'}</>;

  return <>{children(data)}</>;
}