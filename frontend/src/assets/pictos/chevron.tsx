export default function Chevron({Rotate}: {Rotate?: string}) {
    const classes = `svg svg--rotate--${Rotate}`;
    return (
        <svg className={classes} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" className={"svg"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
}