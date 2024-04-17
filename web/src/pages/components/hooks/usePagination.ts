import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const FIRST_PAGE = 0;
const LAST_PAGE = 249;
const INITAL_PAGINATION = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const FINISH_PAGINATION = 240;

const calcPage = (queryPage?: number) => {
    if (!queryPage || queryPage < FIRST_PAGE || isNaN(queryPage)) return FIRST_PAGE;
    if (queryPage > LAST_PAGE) return LAST_PAGE;
    return queryPage;
}

export function usePagination() {

    const { push, query } = useRouter();
    const queryPage = calcPage(Number(query['page']));
    const [page, setPage] = useState<number>(queryPage);
    const [pagesArr, setPagesArr] = useState<Array<number>>(INITAL_PAGINATION);

    useEffect(() => { push({ query: `page=${page}` }) }, [page]);
    useEffect(() => {
        const newArray = new Array(10).fill(0).map((_, index) =>
            (page > FINISH_PAGINATION) ? FINISH_PAGINATION + index : index + page
        );
        setPagesArr(newArray);
    }, [page]);

    const setManualPage = (page: number) => page >= FIRST_PAGE && page <= LAST_PAGE ? setPage(page) : '';
    const firstPage = () => setPage(FIRST_PAGE);
    const lastPage = () => setPage(LAST_PAGE);
    const prevPage = () => {
        let newPage = page - 1;
        if (newPage < FIRST_PAGE) newPage = FIRST_PAGE;
        setPage(newPage)
    };
    const nextPage = () => {
        let newPage = page + 1;
        if (newPage > LAST_PAGE) newPage = LAST_PAGE;
        setPage(newPage)
    };

    return { page, firstPage, lastPage, prevPage, nextPage, pagesArr, setManualPage }

}