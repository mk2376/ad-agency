import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';

type CardType = {
    status: boolean
    title: string;
    description: string;
}

export default function Card({status, title, description}: CardType) {
    return (
        <div className="block rounded-lg text-left bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className='rounded-lg bg-slate-100 p-2 w-min mb-4'>
                { status ?
                    <CheckBadgeIcon
                        height={30}
                        width={30}
                        color='black'
                    />
                    :
                    <XCircleIcon
                        height={30}
                        width={30}
                        color='black'
                    />
                }
            </div>
            <h5 className="mb-2 text-xl leading-tight text-neutral-800 font-bold">
                { title }
            </h5>
            <p className="mb-4 text-base text-neutral-800">
                { description }
            </p>
        </div>
    );
}
