import { get, post } from "@/lib/http"

export const UserService = {
    async userDetailsApil() {
        return await get('/auth/me')
    },
}