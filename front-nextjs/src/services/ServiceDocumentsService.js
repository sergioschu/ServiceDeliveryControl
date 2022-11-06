import axiosInstance from "../utils/axios"

const ServiceDocumentsService = {
    getAll: async () => {
        let response = await axiosInstance.get('/service_documents')
        return response.data
    },
    getById: async (id) => {
        if (!id) return

        let response = await axiosInstance.get(`/service_documents/${id}`)
        return response.data
    },
    create: async (serviceDocument) => {
        if (!serviceDocument) return

        let response = await axiosInstance.post(`/service_documents`, { service_document: serviceDocument })
        return response.data
    },
    destroy: async (id) => {
        if (!id) return

        let response = await axiosInstance.delete(`/service_documents/${id}`)
        return response.data
    },
    update: async (id, serviceDocument) => {
        if (!id && !serviceDocument) return

        let response = await axiosInstance.put(`/service_documents/${id}`, { service_document: serviceDocument })
        return response.data
    }
}

export default ServiceDocumentsService