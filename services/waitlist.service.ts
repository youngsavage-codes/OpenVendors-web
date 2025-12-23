import { post } from "@/lib/http"

export const WaitlistService = {
    async joinwaitlist(email: string) {
        return await post('/waitlist', {
            email
        })
    }
}