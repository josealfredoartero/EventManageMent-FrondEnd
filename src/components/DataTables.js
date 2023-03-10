import React,{useState, useEffect} from 'react';
import DataTable,{createTheme, defaultThemes} from 'react-data-table-component';


const DataTables = ({data, columns, title}) => {

    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);

    const PaginateOptions = {
        rowsPerPageText: 'Filas Por Página',
        rangeSeparatorText: 'de',
        SelectAllRowsItem: true,
        SelectAllRowsItemText: 'Todos'
    }

    createTheme('dark', {
        text: {
          primary: 'black',
          secondary: 'rgba(0, 59, 255, 0.7)',
        },
        background: {
          default: 'rgb(240, 240, 240)',
        },
        header:{
          background: 'black'
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


  const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            background: 'black',
            color: 'white',
            opacity: '.8',
            fontWeight: 'bold',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};


    useEffect(() => {
        const timeout = setTimeout(() => {
          setRows(data);
          setPending(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [data]);

  return (
    <div className='container'>
        <div className='table-responsive mt-2 '>
            <DataTable 
              columns={columns}
              data={rows}
              pagination
              progressPending={pending}
              responsive
              customStyles={customStyles}
              paginationComponentOptions={PaginateOptions}
            />
        </div>
    </div>
  )
}

export default DataTables;