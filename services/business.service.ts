import { del, get, patch, post } from "@/lib/http"

export const BusinessService = {
    async getMyWorkspaceApi() {
        return await get('/workspaces/my-workspace')
    },
    async createMyWorkSpaceApi(data: any) {
        return await post('/workspaces', data)
    },
    async updateMyWorkSpaceApi(data: any) {
        return await patch('/workspaces/my-workspace', data)
    },
    async deactivateMyWorkSpaceApi() {
        return await patch('/workspaces/my-workspace/deactivate')
    },
    async activateMyWorkSpaceApi() {
        return await patch('/workspace/my-workspace-activate')
    },
    async deleteMyWorkSpaceApi() {
        return await del('/workspaces/my-workspace')
    },
}