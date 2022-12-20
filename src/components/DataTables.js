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

  //   const customStyles = {
  //     rows: {
  //         style: {
  //             minHeight: '72px', // override the row height
  //         },
  //     },
  //     headCells: {
  //         style: {
  //             maxWidth: '',
  //             paddingLeft: '8px', // override the cell padding for head cells
  //             paddingRight: '8px',
  //         },
  //     },
  //     cells: {
  //         style: {
  //             maxWidth: '1000px',
  //             paddingLeft: '8px', // override the cell padding for data cells
  //             paddingRight: '8px',
  //             backgroundColor: "red",
  //         },
  //     },
  // };

  const customStyles = {
    	header: {
    		style: {
    			minHeight: '72px',
    		},
    	},
    	headRow: {
    		style: {
    			borderTopStyle: 'solid',
    			borderTopWidth: '1px',
    			borderTopColor: defaultThemes.default.divider.default,
    		},
    	},
    	headCells: {
    		style: {
    			'&:not(:last-of-type)': {
    				borderRightStyle: 'solid',
    				borderRightWidth: '1px',
    				borderRightColor: defaultThemes.default.divider.default,
    			},
    		},
    	},
    	cells: {
    		style: {
    			'&:not(:last-of-type)': {
    				borderRightStyle: 'solid',
    				borderRightWidth: '1px',
    				borderRightColor: defaultThemes.default.divider.default,
    			},
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
              theme='dark'
              responsive
              customStyles={customStyles}
              paginationComponentOptions={PaginateOptions}
            />
        </div>
    </div>
  )
}

export default DataTables;