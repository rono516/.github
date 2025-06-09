import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
// import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Plus } from 'lucide-react';
function HeadingSmall({ title, description, onClick }: { title: string; description?: string; onClick?: () => void }) {
    return (
        <header className="" onClick={onClick}>
            <h3 className="mb-0.5 text-base font-medium">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </header>
    );
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Savings',
        href: '/savings',
    },
];

interface Props {
    savings: Saving[];
}

interface Saving {
    id: number;
    name: string;
    description: string;
    balance: number;
    target: number;
}

type SavingsForm = {
    name: string;
    description: string;
    target: string;
};
type TransferForm = {
    amount: string;
    recipient_wallet_name: string;
};

export default function Savings({ savings }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<SavingsForm>>({
        name: '',
        description: '',
        target: '',
    });

    const submitDeposit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('savings.store'), {
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
            <Head title="Payd Sacco Savings" />

            <div className="px-4 py-6">
                {/* <HeadingSmall onClick={() => setShowForm((prev) => !prev)} title="Savings Accounts" /> */}
                <div className="flex place-content-between">
                    <HeadingSmall title="Savings Accounts" />
                    <button onClick={() => setShowForm((prev) => !prev)}>
                        <Plus />
                    </button>
                </div>

                {showForm && (
                    <div className="py-6">
                        <form onSubmit={submitDeposit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Savings Name</Label>

                                <Input
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    placeholder=""
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>

                                <Input
                                    id="description"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                    placeholder=""
                                />

                                <InputError className="mt-2" message={errors.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="amount">Target Amount</Label>

                                <Input
                                    id="target"
                                    type="number"
                                    min="1"
                                    className="mt-1 block w-full"
                                    value={data.target}
                                    onChange={(e) => setData('target', e.target.value)}
                                    required
                                    placeholder="0"
                                />

                                <InputError className="mt-2" message={errors.target} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Submit</Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">Savings Account Successful Created</p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            {/* Savings Accounts */}
            <div className="px-4 py-6">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {!savings ? (
                        <p>Loading savings...</p>
                    ) : savings.length === 0 ? (
                        <p>No savings found.</p>
                    ) : (
                        savings?.map((sx) => (
                            <Link key={sx.id} href={route('savings.deposit', sx.id)}>
                                <div
                                    key={`${sx.name}-${sx.balance}-${sx.id}`}
                                    className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 p-4 text-center dark:border-sidebar-border"
                                >
                                    <p className="text-lg font-semibold">{sx.name} </p>
                                    <p>
                                        <strong>Balance:</strong> KES {sx.balance}
                                    </p>
                                    <p>
                                        <strong>Target:</strong> KES {sx.target}
                                    </p>

                                    <div className="mt-4 w-full">
                                        <div className="mb-1 text-sm text-neutral-700 dark:text-neutral-300">
                                            Progress: {Math.min(100, Math.round((sx.balance / sx.target) * 100))}%
                                        </div>
                                        <div className="h-3 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
                                            <div
                                                className="h-3 rounded-full bg-green-500 transition-all duration-500"
                                                style={{
                                                    width: `${Math.min(100, (sx.balance / sx.target) * 100)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
