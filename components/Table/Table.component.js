import Tbody from "./Tbody"
import Thead from "./Thead"

const Table = ({ data, columns }) => (
        <table className="table-auto border border-1 w-full">
            <Thead columns={columns} />
            <Tbody data={data} columns={columns}/>
        </table>
)

export default Table