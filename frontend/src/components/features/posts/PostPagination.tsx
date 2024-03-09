import { useQuery } from "@tanstack/react-query";
import { Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../../actions/postAction";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import { Table, TableBody } from "../../ui/table";
import { Post } from "./Post";

export default function PostPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Nombre de publications à afficher par page
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages

  const {
    data,
    isError: postError,
    isLoading: postLoading,
  } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => getPosts(currentPage, postsPerPage),
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleClickPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (!data) return <>no post</>;

  if (postError) return <p>Something went wrong</p>;

  if (postLoading) return <>loading</>;

  // Calcul de la plage de pages à afficher
  const maxPagesToShow = 3; // Nombre maximal de boutons de pagination à afficher
  const startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  return (
    <div className="flex flex-wrap mb-20 space-x-20 space-x-reverse">
      <Link to={"/create-post"}>
        <Link2 /> Publier
      </Link>
      <Table className="max-w-2xl m-auto h-[665px] bg-secondary/25">
        <TableBody>
          {data?.posts.map((post, index) => (
            <Post
              post={post}
              index={index + (currentPage - 1) * postsPerPage + 1}
              key={post._id}
            />
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => handleClickPage(1)}
              variant={currentPage === 1 ? "outline" : "secondary"}
            >
              1
            </PaginationLink>
          </PaginationItem>
          {currentPage > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
            <PaginationItem key={startPage + i}>
              <PaginationLink
                onClick={() => handleClickPage(startPage + i)}
                variant={
                  currentPage === startPage + i ? "outline" : "secondary"
                }
              >
                {startPage + i}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
