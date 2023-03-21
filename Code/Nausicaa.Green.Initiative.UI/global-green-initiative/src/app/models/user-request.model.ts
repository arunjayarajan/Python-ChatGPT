// Represent an existing request
export class UserRequest {
    request_id: string;
    id: number;
    grant_id: number;
    amount: number;
    grant_name: string;
    grant_desc: string;
    summary: string;
    created_date: Date;
    status: string;
    username: string;

    constructor() {
        this.request_id = '';
        this.id = 0;
        this.grant_id = 0;
        this.amount = 0;
        this.summary = this.grant_name = this.grant_desc = '';
        this.created_date = new Date();
        this.status = 'Pending';
        this.username = '';
    }
}