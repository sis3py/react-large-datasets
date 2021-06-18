import { useReducer, useMemo, useCallback } from "react";

const getNbPages = (nbItems, pageSize) => Math.ceil(nbItems / pageSize);

const getIsNextEnabled = (page, nbPages) => page < nbPages;

const getIsPreviousEnabled = page => page - 1 > 0;

const getStartIndex = (pageSize, page) => pageSize * (page - 1);

const getEndIndex = (pageSize, page, nbItems) => {
    const nextPageStartIndex = pageSize * page;
    return nextPageStartIndex > nbItems ? nbItems : nextPageStartIndex;
};

const getPaginationState = ({
    nbItems,
    pageSize,
    page,
}) => {
    const nbPages = getNbPages(nbItems, pageSize);
    const isPreviousEnabled = getIsPreviousEnabled(page);
    const isNextEnabled = getIsNextEnabled(page, nbPages)
    const startIndex = getStartIndex(pageSize, page);
    const endIndex = getEndIndex(pageSize, page, nbItems);

    return {
        nbPages,
        startIndex,
        endIndex,
        isPreviousEnabled,
        isNextEnabled,
    };
};

const usePaginationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NB_ITEMS":
            return { 
                ...state,
                nbItems: action.nbItems
            };
        case "SET_PAGE_SIZE":
            return { 
                ...state,
                pageSize: action.pageSize
            };
        case "SET_PAGE":
            return { 
                ...state,
                page: action.page
            };
        case "SET_NEXT_PAGE":
            return {
                ...state,
                page: getIsNextEnabled(state.page, getNbPages(state.nbItems, state.pageSize)) ? state.page + 1: state.page
            };
        case "SET_PREVIOUS_PAGE":
            return {
                ...state,
                page: getIsPreviousEnabled(state.page) ? state.page - 1 : state.page
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const usePagination = ({ defaultNbItems = 0, defaultPage = 1, defaultPageSize = 10 }) => {

    const [{ nbItems, page, pageSize }, dispatch] = useReducer(usePaginationReducer, { nbItems: defaultNbItems, page: defaultPage, pageSize: defaultPageSize });

    const paginationState = useMemo(() => getPaginationState({ nbItems, pageSize, page }), [nbItems, pageSize, page]);

    return {
        setNbItems: useCallback(nbItems => dispatch({ type: "SET_NB_ITEMS", nbItems }), [dispatch]),
        setPageSize: useCallback(pageSize => dispatch({ type: "SET_PAGE_SIZE", pageSize }), [dispatch]),
        setPage: useCallback(page => dispatch({ type: "SET_PAGE", page }), [dispatch]),
        setNextPage: useCallback(() => dispatch({ type: "SET_NEXT_PAGE" }), [dispatch]),
        setPreviousPage: useCallback(() => dispatch({ type: "SET_PREVIOUS_PAGE" }), [dispatch]),
        page,
        pageSize,
        ...paginationState,
    };
}