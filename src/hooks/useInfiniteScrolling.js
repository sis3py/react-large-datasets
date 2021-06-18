import { useReducer, useEffect, useMemo, useCallback, useRef } from "react";

const getEndIndex = (pageSize, page, nbItems) => {
    const nextPageStartIndex = pageSize * page;
    return nextPageStartIndex > nbItems ? nbItems : nextPageStartIndex;
};

const useInfiniteScrollingReducer = (state, action) => {
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
                page: state.page + 1
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const useInfiniteScrolling = ({defaultNbItems = 0, defaultPageSize = 10, detectionMargin = 20}) => {

    const loaderRef = useRef(null);

    const [{ nbItems, page, pageSize }, dispatch] = useReducer(useInfiniteScrollingReducer, { nbItems: defaultNbItems, page: 1, pageSize: defaultPageSize });

    const endIndex = useMemo(() => getEndIndex(pageSize, page, nbItems), [nbItems, page, pageSize]);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            dispatch({ type: "SET_NEXT_PAGE" });
        }
      }, []);
    
      useEffect(() => {

        const option = {
          root: null, // viewport by default
          rootMargin: `${detectionMargin}px`,
          threshold: 0
        };

        const observer = new IntersectionObserver(handleObserver, option);
        if (loaderRef.current) {
          observer.observe(loaderRef.current)
        };
      }, [detectionMargin, handleObserver]);

      return {
        setNbItems: useCallback(nbItems => dispatch({ type: "SET_NB_ITEMS", nbItems }), [dispatch]),
        setPageSize: useCallback(pageSize => dispatch({ type: "SET_PAGE_SIZE", pageSize }), [dispatch]),
        setPage: useCallback(page => dispatch({ type: "SET_PAGE", page }), [dispatch]),
        loaderRef,
        endIndex,
    };
}