import { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import styles from './GadgetTable.module.css'

const PAGE_SIZE = 5

/**
 * GadgetTable — registry table powered by @tanstack/react-table (headless)
 * rendered with MUI table components.
 *
 *  - Client-side pagination fixed at 5 rows per page.
 *  - Previous / Next controls with a page indicator and disabled states.
 *  - Clicking a row selects that gadget (highlighted via MUI's `selected`).
 *
 * `pageIndex` is controlled by the parent so that changing the underlying
 * data (e.g. filtering in Checkpoint 4) can reset pagination cleanly.
 */
function GadgetTable({
  gadgets,
  selectedGadgetId,
  onSelectGadget,
  pagination,
  onPaginationChange,
}) {
  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Gadget Name' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'subCategory', header: 'Sub-category' },
      { accessorKey: 'manufacturer', header: 'Manufacturer' },
      { accessorKey: 'healthRating', header: 'Health' },
      { accessorKey: 'techBrand', header: 'Tech Brand' },
      {
        accessorKey: 'userRole',
        header: 'User Role',
        cell: (info) => {
          const role = info.getValue()
          return (
            <Chip
              label={role}
              size="small"
              color={role === 'Engineer' ? 'primary' : 'secondary'}
            />
          )
        },
      },
    ],
    [],
  )

  const table = useReactTable({
    data: gadgets,
    columns,
    state: { pagination },
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const { pageIndex } = table.getState().pagination
  const pageCount = table.getPageCount()
  const rows = table.getRowModel().rows

  return (
    <Paper variant="outlined" className={styles.tablePaper}>
      <div className={styles.header}>
        <Typography variant="h6" component="h2">
          Gadget Registry
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {gadgets.length} gadget{gadgets.length === 1 ? '' : 's'} · click a row
          to select
        </Typography>
      </div>

      <TableContainer className={styles.tableContainer}>
        <Table size="small" aria-label="gadget registry table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = row.original.id === selectedGadgetId
              return (
                <TableRow
                  key={row.id}
                  hover
                  selected={isSelected}
                  onClick={() => onSelectGadget(row.original.id)}
                  className={styles.bodyRow}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.pagination}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<NavigateBeforeIcon />}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Typography variant="body2" className={styles.pageIndicator}>
          Page {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          endIcon={<NavigateNextIcon />}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </Paper>
  )
}

export { PAGE_SIZE }
export default GadgetTable
