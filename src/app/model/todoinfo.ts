import { TodoItem } from "./todoitem";
export interface TodoInfo {
    id: number;
    title: string;
    created_at: string;
    public_list: boolean;
    created_by: number;
    list_items: TodoItem[];
    shared_with: {"email":string, "name":string}[];
}
