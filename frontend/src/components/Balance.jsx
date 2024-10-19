export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="ml-2 mt-2 font-bold text-lg">
            Your balance:
        </div>
        <div className="font-semibold ml-2 mt-2 text-lg">
            Rs {value}
        </div>
    </div>
}