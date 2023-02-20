export interface HttpClientInterface {
    get(url: string, config?: RequestInit): Promise<Response>;
    post(url: string, data: unknown, config?: RequestInit): Promise<Response>;
    put(url: string, data: unknown, config?: RequestInit): Promise<Response>;
    delete(url: string, data?: unknown, config?: RequestInit): Promise<Response>;
}