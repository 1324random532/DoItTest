import { SxProps, Theme } from '@mui/material';
import TablePagination from '@mui/material/TablePagination/TablePagination';
import { ChangeEvent } from 'react';

export interface PaginationState {
    totalRows: number;
    page: number;
    pageSize: number;
}

type PaginationProps = PaginationState & {
    onChangePage: (page: number) => void;
    onChangePageSize: (pageSize: number) => void
    sx?: SxProps<Theme>
}

export function Pagination(props: PaginationProps) {
    function changePage(page: number) {
        if (Number.isNaN(page)) return;
        if (props.page == page + 1) return;
        if (page < 0 || page >= Number.MAX_VALUE) return;
        props.onChangePage(page + 1)
    }

    function changePageSize(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const pageSize = parseInt(event.target.value, 10);
        props.onChangePageSize(pageSize);
    }

    return (
        <TablePagination
            component="div"
            count={props.totalRows}
            page={Math.max(props.page - 1, 0)}
            onPageChange={(_, page) => changePage(page)}
            rowsPerPage={props.pageSize}
            onRowsPerPageChange={event => changePageSize(event)}
            labelRowsPerPage="Строк на странице:"
            labelDisplayedRows={
                ({ from, to, count }) => {
                    return `${from} - ${to} из ${count}`
                }
            }
            sx={props.sx}
        />
    )
}
