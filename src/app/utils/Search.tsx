import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface SearchProps {
  readonly baseUrl: URLSearchParams;
  readonly searchTerm: string;
  readonly searchPage: string;
}

const useHandleSearch = () => {
  const router = useRouter();

  const handleSearch = useCallback(
    ({ baseUrl, searchPage, searchTerm }: SearchProps) => {
      const newUrl = new URLSearchParams(baseUrl);
      newUrl.set("search", searchTerm);
      newUrl.set("page", "1");
      router.push(`${searchPage}/?${newUrl.toString()}`);
    },
    [router]
  );

  return handleSearch;
};

export default useHandleSearch;
