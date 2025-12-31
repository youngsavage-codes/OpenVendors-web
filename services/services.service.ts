import { del, get, patch, post } from "@/lib/http"

export const ServicesService = {
    async createServiceApi(data: any) {
        return await post('/services', data)
    },
    async getMyServiceApi() {
        return await get('/services/my/services')
    },
    async getServiceByIdApi(id: string) {
        return await get(`/services/${id}`)
    },
     async getVendorServiceApi(id: string) {
        return await get(`/services/provider/${id}`)
    },
}