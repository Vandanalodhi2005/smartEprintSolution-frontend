import React from "react";

const Skeleton = ({ className = '' }) => (
    <div className={`animate-pulse bg-slate-100 ${className}`} />
);

export const ProductCardSkeleton = () => (
    <div className="bg-white rounded-[2.5rem] border-2 border-slate-50 overflow-hidden p-6 space-y-6">
        <Skeleton className="h-64 w-full rounded-[2rem]" />
        <div className="space-y-4 px-2">
            <Skeleton className="h-2 w-16" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="flex justify-between items-center pt-4">
               <Skeleton className="h-8 w-24 rounded-xl" />
               <Skeleton className="h-10 w-10 rounded-full" />
            </div>
        </div>
    </div>
);

export const ProductGridSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(count)].map((_, i) => (
            <ProductCardSkeleton key={i} />
        ))}
    </div>
);

export const ProductDetailSkeleton = () => (
    <div className="min-h-screen bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
                <div className="space-y-6">
                    <Skeleton className="aspect-square w-full rounded-[3rem]" />
                    <div className="flex gap-4">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-24 w-24 rounded-[1.5rem]" />
                        ))}
                    </div>
                </div>
                <div className="space-y-10 py-4">
                    <div className="space-y-4">
                       <Skeleton className="h-2 w-24" />
                       <Skeleton className="h-12 w-full rounded-2xl" />
                       <Skeleton className="h-12 w-3/4 rounded-2xl" />
                    </div>
                    <Skeleton className="h-16 w-40 rounded-2xl" />
                    <Skeleton className="h-32 w-full rounded-[2rem]" />
                    <div className="flex gap-6">
                        <Skeleton className="h-16 w-32 rounded-2xl" />
                        <Skeleton className="h-16 flex-1 rounded-2xl" />
                    </div>
                    <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-50">
                        <Skeleton className="h-10 w-full rounded-xl" />
                        <Skeleton className="h-10 w-full rounded-xl" />
                        <Skeleton className="h-10 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const OrderDetailSkeleton = () => (
    <div className="min-h-screen bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
            <div className="flex justify-between items-center">
                <Skeleton className="h-12 w-64 rounded-2xl" />
                <Skeleton className="h-6 w-48 rounded-xl" />
            </div>
            <div className="flex justify-between p-10 bg-slate-50 rounded-[3rem]">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-2 w-16" />
                    </div>
                ))}
            </div>
            <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-8 items-center p-6 border-2 border-slate-50 rounded-[2rem]">
                        <Skeleton className="h-20 w-20 rounded-2xl" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-4 w-3/4 rounded-lg" />
                            <Skeleton className="h-2 w-1/2 rounded-lg" />
                        </div>
                        <Skeleton className="h-6 w-24 rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const DashboardSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border-2 border-slate-50 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <Skeleton className="h-12 w-12 rounded-2xl" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-10 w-32 rounded-xl mb-2" />
                <Skeleton className="h-3 w-24 rounded-lg" />
            </div>
        ))}
    </div>
);

export const TableSkeleton = ({ rows = 5, cols = 5 }) => (
    <>
        {[...Array(rows)].map((_, i) => (
            <tr key={i} className="border-b border-slate-50">
                {[...Array(cols)].map((_, j) => (
                    <td key={j} className="px-8 py-6">
                        <Skeleton className="h-4 w-full rounded-lg" />
                    </td>
                ))}
            </tr>
        ))}
    </>
);

export default Skeleton;
