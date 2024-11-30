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
  updateClass(
    id: string,
    updates: {
      statusShift: number;
      name: string;
      status: number;
      headTeacherName: string;
      assistantName: string;
      headTeacherId: number;
      assistantId: number;
    }
  ): Promise<void>;
}
