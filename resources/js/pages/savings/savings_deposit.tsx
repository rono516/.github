import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Savings Deposit',
        href: '/transact',
    },
];

interface Props {
    saving: Saving[];
}

interface Saving {
    id: number;
    name: string;
    description: string;
    balance: number;
    target: number;
}

type DepositForm = {
    amount: number;
    savings_id: number;
};

export default function Transact({ saving }: Props) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<DepositForm>>({
        amount: 0,
        savings_id: saving.id,
    });
    const { flash } = usePage().props as unknown as {
        flash: { success?: string; error?: string };
    };

    const submitDeposit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('wallet.savings.deposit'), {
            onSuccess: () => {
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payd Transact" />

            <div className="px-4 py-6">
                <header>
                    <h3 className="mb-0.5 text-base font-medium">Deposit to {saving.name}</h3>
                </header>

                {/* Flash Messages */}
                {flash.success && <div className="mb-4 mt-4 rounded bg-green-100 px-4 py-2 text-sm text-green-700">{flash.success}</div>}
                {flash.error && <div className="mb-4 mt-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700">{flash.error}</div>}
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
                                onChange={(e) => setData('amount', Number(e.target.value))}
                                required
                                // placeholder="0"
                            />

                            <InputError className="mt-2" message={errors.amount} />
                        </div>
                        <Input
                            id="savings_id"
                            type="number"
                            hidden
                            className="mt-1 block w-full"
                            value={data.savings_id}
                            onChange={(e) => setData('savings_id', Number(e.target.value))}
                            required
                            placeholder="0"
                        />

                        <InputError className="mt-2" message={errors.savings_id} />

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Deposit</Button>

                            {/* <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Savings Account updated Successfully</p>
                            </Transition> */}
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
