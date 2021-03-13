import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useTable, useRowSelect } from 'react-table'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import './users-table.styles.scss'

library.add(fas)

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type='checkbox' ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const Table = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ['id'],
      }
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

const UsersTable = ({ allUsers, handleUpdateUser }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: '',
        id: 'users-table',
        columns: [
          {
            Header: () => <h3>{'Id'}</h3>,
            accessor: 'id',
            isVisible: false,
          },
          {
            Header: () => <h3>{'TYPE'}</h3>,
            accessor: 'type',
          },
          {
            Header: () => <h3>{'NAME'}</h3>,
            accessor: 'name',
          },
          {
            Header: () => <h3>{'EMAIL'}</h3>,
            accessor: 'email',
          },
          {
            Header: () => <h3>{'TELEPHONE'}</h3>,
            accessor: 'phone',
          },
          {
            Header: () => <h3>{'STATUS'}</h3>,
            accessor: 'active',
            Cell: ({ cell }) => {
              return (
                <div>
                  {
                    cell.row.values.active ? 
                      <FontAwesomeIcon 
                        icon={['fas', 'toggle-on']} 
                        size='2x' 
                        color='#98d8d8' 
                        onClick={() => handleUpdateUser(cell.row.values.id)}
                      />
                    :
                      <FontAwesomeIcon 
                        icon={['fas', 'toggle-off']} 
                        size='2x'
                        color='grey' 
                        onClick={() => handleUpdateUser(cell.row.values.id)}
                      />
                  }
                </div>
              )
            },
          }
        ]
      }
    ],
    [handleUpdateUser]
  )

  return (
    <div className='users-table'>
      <CssBaseline />
      <Table columns={columns} data={allUsers} />
    </div>
  )
}

export default UsersTable
