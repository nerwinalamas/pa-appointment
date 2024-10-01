"use client";

import { useRouter } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const PageHandler = ({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) => {
    const router = useRouter();

    const handlePageChange = (newPage: number) => {
        router.push(`?page=${newPage}`);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 2) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => handlePageChange(i)}
                            isActive={currentPage === i}
                            className="cursor-pointer"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            const startPage =
                currentPage === totalPages ? currentPage - 1 : currentPage;
            for (let i = startPage; i < startPage + 2 && i <= totalPages; i++) {
                pageNumbers.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => handlePageChange(i)}
                            isActive={currentPage === i}
                            className="cursor-pointer"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (startPage + 1 < totalPages) {
                pageNumbers.push(
                    <PaginationItem key="ellipsis">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() =>
                            currentPage > 1 && handlePageChange(currentPage - 1)
                        }
                        className={
                            currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            currentPage < totalPages &&
                            handlePageChange(currentPage + 1)
                        }
                        className={
                            currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PageHandler;
