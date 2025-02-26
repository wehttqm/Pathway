import programAreas from "@/../public/programAreas.json"

type Program = {
    href: string,
    name: string,
}

export const Setup = () => {
    return (
        <div className='flex flex-col w-full justify-start'>
            {programAreas.map((program: Program) => {
                return (
                    <div>{program.name}</div>
                )
            })}
        </div>
    )
}
