import {toast, type ToastT} from "sonner"

// Custom toast styling options
const toastOptions: Partial<ToastT> = {
    className: "bg-background text-foreground border border-border",
    descriptionClassName: "text-muted-foreground",
    actionButtonClassName: "bg-primary text-primary-foreground hover:bg-primary/90",
    cancelButtonClassName: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    style: {
        // Override any default Sonner styles if needed
    },
}

export const showToast = {
    success: (title: string, description?: string, options?: Partial<ToastT>) => {
        toast(title, {
            description,
            ...toastOptions,
            ...options,
        })
    },
    error: (title: string, description?: string, options?: Partial<ToastT>) => {
        toast(title, {
            description,
            ...toastOptions,
            ...options,
        })
    },
    info: (title: string, description?: string, options?: Partial<ToastT>) => {
        toast(title, {
            description,
            ...toastOptions,
            ...options,
        })
    },
    warning: (title: string, description?: string, options?: Partial<ToastT>) => {
        toast(title, {
            description,
            ...toastOptions,
            ...options,
        })
    },
}

