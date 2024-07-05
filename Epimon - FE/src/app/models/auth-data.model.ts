export interface AuthData {
    accessToken: string,
    user: {
        username: string,
        id: string,
        password: string
    }
}