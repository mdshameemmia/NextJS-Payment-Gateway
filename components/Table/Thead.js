const Thead = ({columns}) => (
    <thead>
        <tr>
            {
                columns.map((column, index) => {
                    return <td className='border border-slate-300 px-2' key={`column-${index}`}>{column.name}</td>
                })
            }
        </tr>
    </thead>
)

export default Thead