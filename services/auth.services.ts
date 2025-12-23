import { post } from "@/lib/http"

export const AuthService = {
    async verifyEmail(email: string) {
        return await post('/auth/verify-email', {
            email
        })
    },
    async loginApi(email: string, password: string) {
        return await post('/auth/login', {
            email,
            password
        })
    },
    async registerApi(data: string) {
        return await post('/auth/register', data)
    },
    async sendVerifyEmailOtpApi(email: string) {
        return await post('/auth/email/send-otp', {email})
    },
    async verifyEmailOtpApi(email: string, otp: string) {
        return await post('/auth/email/verify', {email, otp})
    },
    async forgotPasswordApi(email: string) {
        return await post('/auth/password/forgot', {email})
    },
    async resetPasswordApi(email: string, newPassword: string) {
        return await post('/auth/password/reset', {email, newPassword})
    }
}