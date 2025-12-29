import { del, get, post } from "@/lib/http"

export const AvailabilityService = {
    async setAvailabilityApi(schedule: any) {
        return await post('/availability', schedule)
    },
    async getMyAvailabilityApi() {
        return await get('/availability')
    },
    async getTimeOffApi() {
        return await get('/availability/time-off')
    },
    async addTimeOffApi(data: any) {
        return await post('/availability/time-off', data)
    },
    async deleteTimeOffApi(id: string) {
        return await del(`/availability/time-off/${id}`)
    },
}