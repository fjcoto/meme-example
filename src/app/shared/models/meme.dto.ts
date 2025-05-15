export interface MemeDTO {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
}

export interface MemeApiResponse {
    success: boolean;
    data: {
        memes: MemeDTO[];
    };
}