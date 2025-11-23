import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () =>{
        set({ isUsersLoading:true });
        try{
            const res = await axiosInstance.get("/messages/users");
            set({ users:res.data });
        }
        catch(error){
            const msg = error?.response?.data?.message || error?.message || "Failed to load users";
            toast.error(msg);
        }
        finally{
            set({ isUsersLoading:false });
        }
    },

    getMessages: async(userId) => {
        set({ isMessagesLoading:true });
        try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages:res.data });
        }
        catch(error){
            const msg = error?.response?.data?.message || error?.message || "Failed to load messages";
            toast.error(msg);
        }
        finally{
            set({ isMessagesLoading:false });
        }
    },

    sendMessage: async(messageData) => {
        const { selectedUser, messages } = get();
        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...(messages || []), res.data] });
            return res.data;
        } catch(error){
            const msg = error?.response?.data?.message || error?.message || "Failed to send message";
            toast.error(msg);
            console.error("sendMessage error:", error);
            throw error;
        }
    },

    // placeholders for real-time subscription handlers (socket.io integration)
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;
            set({ messages: [...(get().messages || []), newMessage] });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

