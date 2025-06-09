import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    user: User;
    flash?: {
        success?: string;
        error?: string;
    };
    notifications: number,
    totalDeposits: number;
    totalReceived: number;
    totalTransferred: number;
    totalSavings: number;
    transactions: {
        data: Transaction[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

interface Transaction {
    id: number;
    type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
    amount: number;
    description: string;
    wallet: Wallet;
    target_wallet?: Wallet;
    created_at: string;
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

interface Props {
    user: User;
}

export default function Dashboard({ user, flash, totalDeposits, totalReceived, totalSavings,totalTransferred, transactions }: Props) {
    const [showFlash, setShowFlash] = useState(!!flash?.success);
    useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);

            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 3000); // 3000ms = 3 seconds

            return () => clearTimeout(timer); // Cleanup on unmount or re-render
        }
    }, [flash?.success]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {showFlash && flash?.success && (
                <div className="mx-auto my-4 flex w-1/2 items-center justify-center rounded-lg bg-green-100 px-4 py-2 text-green-800 shadow">
                    {flash.success}
                </div>
            )}
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                    <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 text-center dark:border-sidebar-border">
                        <h2 className="text-lg font-semibold">Wallet</h2>
                        <p>
                            <strong>Address:</strong> {user.wallet.name}
                        </p>
                        <p>
                            <strong>Balance:</strong> KES {user.wallet.balance}
                        </p>
                    </div>
                    <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 text-center dark:border-sidebar-border">
                        <h2 className="text-lg font-semibold">Deposits</h2>

                        <p>
                            <strong>Total:</strong> KES {totalDeposits}
                        </p>
                    </div>
                    <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 text-center dark:border-sidebar-border">
                        <h2 className="text-lg font-semibold">Received</h2>

                        <p>
                            <strong>Total:</strong> KES {totalReceived}
                        </p>
                    </div>
                    <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 text-center dark:border-sidebar-border">
                        <h2 className="text-lg font-semibold">Sent</h2>

                        <p>
                            <strong>Total:</strong> KES {totalTransferred}
                        </p>
                    </div>
                    <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 text-center dark:border-sidebar-border">
                        <h2 className="text-lg font-semibold">Savings</h2>

                        <p>
                            <strong>Total:</strong> KES {totalSavings}
                        </p>
                    </div>
                </div>
                <div className="px-4 py-3">
                    <HeadingSmall title="Recent Transactions" />
                </div>
                {transactions.data.length > 0 ? (
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="px-4 py-2">Type</th>
                                        <th className="px-4 py-2">Amount</th>
                                        <th className="px-4 py-2">From</th>
                                        <th className="px-4 py-2">To</th>
                                        <th className="px-4 py-2">Description</th>
                                        <th className="px-4 py-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.data.map((tx) => (
                                        <tr key={tx.id} className="border-t">
                                            <td className="px-4 py-2">{tx.type == "TRANSFER" && tx.target_wallet?.name == user.wallet.name ? "RECEIVED": tx.type}</td>
                                            <td className="px-4 py-2">KES {tx.amount}</td>
                                            <td className="px-4 py-2">{tx.wallet?.name || '-'}</td>
                                            <td className="px-4 py-2">{tx.target_wallet?.name || '-'}</td>
                                            <td className="px-4 py-2">{tx.description}</td>
                                            <td className="px-4 py-2">{new Date(tx.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 px-3">
                            {transactions.links.map((link, index) =>
                                link.url ? (
                                    <a
                                        key={index}
                                        href={link.url}
                                        className={`rounded border px-3 py-1 text-sm ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span key={index} className="px-3 py-1 text-sm text-gray-400" dangerouslySetInnerHTML={{ __html: link.label }} />
                                ),
                            )}
                        </div>
                    </div>
                ) : (
                    <h2 className="text-center">Your transaction history will show here</h2>
                )}
            </div>
        </AppLayout>
    );
}
