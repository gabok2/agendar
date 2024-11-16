import { IClass, IStatusClass, IStatusShift } from "./class";

export interface IClassRepository {
  fetchClass(
    page: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{ classes: IClass[] | null; count: number | null }>;
  deleteClass(id: string): Promise<void>;
  fetchStatusClass(): Promise<IStatusClass[]>;
  fetchStatusShift(): Promise<IStatusShift[]>;
}
