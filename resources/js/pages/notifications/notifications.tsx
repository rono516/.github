import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notifications',
        href: '/notifications',
    },
];

interface Props {
    user: User;
    flash?: {
        success?: string;
        error?: string;
    };
}

interface Wallet {
    name: string;
    balance: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    user_name: string;
    wallet: Wallet;
}
interface Notification {
    id: string;
    data: {
        message: string;
        [key: string]: any;
    };
    read_at: string | null;
    created_at: string;
}

interface Props {
    user: User;
    notifications: Notification[];
}

export default function Notifications({ user, flash, notifications }: Props) {
    const [showFlash, setShowFlash] = useState(!!flash?.success);
    useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);

            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 3000); // 3000ms = 3 seconds

            return () => clearTimeout(timer);
        }
    }, [flash?.success]);
    const { post } = useForm();

    const markAsRead = (id: string) => {
        post(route('notifications.read', id), {
            onSuccess: () => {
                window.location.reload(); // Full browser refresh
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <div className="space-y-4 p-4">
                {notifications.length === 0 ? (
                    <p className="text-gray-600">You have no notifications.</p>
                ) : (
                    notifications.map((notif) => (
                        <div key={notif.id} className={`rounded border p-4 shadow ${notif.read_at ? 'bg-white' : 'bg-blue-50'}`}>
                            <p>{notif.data.message}</p>
                            <small className="text-gray-500">{new Date(notif.created_at).toLocaleString()}</small>
                            {!notif.read_at && (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        markAsRead(notif.id);
                                    }}
                                    className="mt-2"
                                >
                                    <button type="submit" className="text-sm text-blue-600 underline">
                                        Mark as read
                                    </button>
                                </form>
                            )}
                        </div>
                    ))
                )}
            </div>
        </AppLayout>
    );
}
