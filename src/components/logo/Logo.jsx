const Logo = ({ variant = "w-8" }) => {

    return (
        <>
        <img className={`${variant} cursor-pointer`} src="/logo/goalpocket-dark.png" alt="GoalPocket Logo" />
        </>
    )
}

export default Logo;