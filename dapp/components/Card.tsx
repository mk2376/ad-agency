import Image from "next/image";

type CardType = {
    status: boolean
    title: string;
    description: string;
}

export default function Card({status, title, description}: CardType) {
    return (
        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <Image 
                src={ status ? "assets/img/check_badge.svg": "assets/img/x_circle.svg" } 
                alt={ status ? "Check badge": "X circle"}
                height={30}
                width={30}
            ></Image> 
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                { title }
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                { description }
            </p>
        </div>
    );
}
