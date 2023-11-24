export function Image({
    src,
    alt,
    credit,
}: {
    src: string,
    alt: string,
    credit: string,
}) {
    return (
        <div className="group relative border border-transparent hover:border-black">
            <img src={src} alt={alt} />
            {credit && <p className="hidden group-hover:block absolute z-10 group-hover:outline outline-1 outline-black p-1 text-xs bg-white w-full text-right">
                By: {credit}
            </p>}
        </div>
    )
}