import React,{useState, useEffect} from 'react';
import DataTable,{createTheme} from 'react-data-table-component';


const DataTables = ({data, columns, title}) => {

    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);

    const PaginateOptions = {
        rowsPerPageText: 'Filas Por Página',
        rageSeparatorText:'de',
        SelectAllRowsItem:true,
        SelectAllRowsItemText:'Todos'
    }

    createTheme('dark', {
        text: {
          primary: 'White',
          secondary: 'green',
        },
        background: {
          default: 'black',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
          default: '#073642',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');


    useEffect(() => {
        const timeout = setTimeout(() => {
          setRows(data);
          setPending(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, [data]);

  return (
    <div className='container'>
        <h1 className='text-center'>Lista De {title}</h1>
        <button className='btn btn-success'>Agregar {title}</button>
        <div className='container table-responsive mt-2 '>
            <DataTable 
              columns={columns}
              data={rows}
              pagination
              fixedHeader
              progressPending={pending}
              responsive
              pointerOnHover
              theme='dark'
              paginationComponentOptions={PaginateOptions}
            />
        </div>
    </div>
  )
}

export default DataTables;