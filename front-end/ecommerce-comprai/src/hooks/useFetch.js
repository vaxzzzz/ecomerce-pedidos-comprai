import { useEffect, useState } from "react";
import { getErrorMessage } from "../services/api";

/**
 * Runs a service function when the component appears and tracks
 * the loading and error states for it.
 *
 * @param {Function} fetchFunction - Returns a Promise. It must be stable:
 *   use a service function directly, or wrap it with useCallback when it
 *   depends on a value (e.g. an id from the URL).
 * @returns {{data: any, setData: Function, isLoading: boolean, error: string}}
 *   `setData` lets the page update the list locally (e.g. after deleting).
 */
export function useFetch(fetchFunction) {
    const [state, setState] = useState({
        source: null, // which function produced this state
        data: null,
        error: "",
    });

    useEffect(() => {
        let isCancelled = false;

        fetchFunction()
            .then((data) => {
                if (!isCancelled) setState({ source: fetchFunction, data, error: "" });
            })
            .catch((error) => {
                if (!isCancelled) {
                    setState({ source: fetchFunction, data: null, error: getErrorMessage(error) });
                }
            });

        // Ignores the answer if the component left or the function changed.
        return () => {
            isCancelled = true;
        };
    }, [fetchFunction]);

    function setData(newData) {
        setState((current) => ({ ...current, data: newData }));
    }

    // Loading while the last answer is not from the current function.
    const isLoading = state.source !== fetchFunction;

    return {
        data: isLoading ? null : state.data,
        setData,
        isLoading,
        error: isLoading ? "" : state.error,
    };
}
