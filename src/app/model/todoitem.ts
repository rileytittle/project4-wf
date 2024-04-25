export interface TodoItem {
    id: number,
    task: string,
    completed: boolean,
    completed_by: number,
    completed_date: string,
    created_at: string,
    updated_at: string,
    due_date: string,
    list_id: number,
    completed_by_user: {
        email: string,
        name: string
    }
}
