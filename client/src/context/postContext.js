import { createContext, useContext, useState, useEffect } from "react";
import { fetchPostsFromServer } from "../services/post.api";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        try {
          const data = await fetchPostsFromServer();
          setPosts(data.data);
          setIsLoading(false);
        } catch (error) {
          setError(true);
          setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <PostContext.Provider value={{ posts, isLoading, error }}>
          {children}
        </PostContext.Provider>
    );
}

export function usePost () {
    return useContext(PostContext);
}