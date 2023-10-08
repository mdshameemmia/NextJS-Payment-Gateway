const Tbody = ({ data, columns }) => (
  <tbody>
    {
      data.length > 0 && data.map((item) => {
        return <tr key={item._id}>
          {
            columns.map((column, index) => {
              if (column.path) {
                return <td className='border border-slate-300 px-2' key={`row-${index}`}>{item[column.path]}</td>
              } else {
                return column.addContent(item)
              }
            })
          }

        </tr>
      })
    }
  </tbody>
)

export default Tbody