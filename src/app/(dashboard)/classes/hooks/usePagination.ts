export function usePagination(count: number, pageSize: number) {
  const totalPages = Math.ceil(count / pageSize);
  return totalPages;
}
