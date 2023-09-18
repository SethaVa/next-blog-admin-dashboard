import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function useRouterRefresh(): [() => void, boolean] {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    router.refresh();
  }, [router]);

  return [refresh, isRefreshing];
}
