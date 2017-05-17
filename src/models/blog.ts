/*export class Blog {
    constructor(
        public id: number,
        public owner_user_id: number,
        public name: string,
        public slug: string,
        public description: string,
        public type:string
    ) { }
}*/

export interface Blog {
    id: number,
    owner_user_id: number,
    name: string,
    slug: string,
    description: string,
    type:string  
}