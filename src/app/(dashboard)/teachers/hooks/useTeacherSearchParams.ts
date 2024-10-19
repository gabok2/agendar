import { ParsedUrlQuery } from "querystring";

const DEFAULT_PAGE_SIZE = 10;

export function useTeacherSearchParams(searchParams: ParsedUrlQuery) {
  const page = parseInt(searchParams.page as string) || 1;
  const searchTerm = (searchParams.search as string) || "";
  const pageSize =
    parseInt(searchParams.pageSize as string) || DEFAULT_PAGE_SIZE;

  const baseUrl = new URLSearchParams(searchParams as Record<string, string>);

  return { page, searchTerm, pageSize, baseUrl };
}
