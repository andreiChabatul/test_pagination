import Pagination from 'react-bootstrap/Pagination';
import { usePagination } from './hooks/usePagination';


export default function PaginationComponents() {

    const { page, pagesArr, firstPage, lastPage, prevPage, nextPage, setManualPage } = usePagination();

    return (

        <Pagination>
            <Pagination.First onClick={firstPage} />
            <Pagination.Prev onClick={prevPage} />
            {pagesArr.map((elem) =>
                <Pagination.Item
                    onClick={() => setManualPage(elem)}
                    key={elem}
                    active={elem === page}
                >
                    {elem + 1}
                </Pagination.Item>)}
            <Pagination.Next onClick={nextPage} />
            <Pagination.Last onClick={lastPage} />
        </Pagination>
    );
}
