import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transact Payd',
        href: '/transact',
    },
];

type DepositForm = {
    amount: string;
};
type TransferForm = {
    amount: string;
    recipient_wallet_name: string;
};

export default function Transact({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<DepositForm>>({
        amount: '',
    });

    const submitDeposit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('transact.deposit'), {
            onSuccess: () => {
                setTimeout(() => {
                    window.location.reload(); // Full browser refresh after 2 seconds
                }, 1000);
            },
        });
    };

    const {
        data: transferData,
        setData: setTransferData,
        post: postTransfer,
        errors: transferErrors,
        processing: transferProcessing,
        recentlySuccessful: transferSuccess,
    } = useForm<TransferForm>({
        amount: '',
        recipient_wallet_name: '',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payd Transact" />

            <div className="px-4 py-6">
                <HeadingSmall title="Deposit" />
                <div className="py-6">
                    <form onSubmit={submitDeposit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Amount</Label>

                            <Input
                                id="amount"
                                type="number"
                                min="1"
                                className="mt-1 block w-full"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                required
                                placeholder="0"
                            />

                            <InputError className="mt-2" message={errors.amount} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Deposit</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Deposit Successful</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>
            <div className="px-4 py-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        postTransfer(route('transact.transfer'), { preserveScroll: true });
                    }}
                    className="space-y-6"
                >
                    <h2 className="text-lg font-semibold">Transfer Funds</h2>

                    <div className="grid gap-2">
                        <Label htmlFor="recipient_wallet_name">Recipient Wallet Name</Label>
                        <Input
                            id="recipient_wallet_name"
                            value={transferData.recipient_wallet_name}
                            onChange={(e) => setTransferData('recipient_wallet_name', e.target.value)}
                            required
                            placeholder="recipient_wallet"
                        />
                        <InputError message={transferErrors.recipient_wallet_name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            min="1"
                            value={transferData.amount}
                            onChange={(e) => setTransferData('amount', e.target.value)}
                            required
                            placeholder="0"
                        />
                        <InputError message={transferErrors.amount} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={transferProcessing}>Transfer</Button>

                        <Transition
                            show={transferSuccess}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Transfer Successful</p>
                        </Transition>
                    </div>
                </form>
            </div>

        </AppLayout>
    );
}
