import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Pagebar({ totalProducts, page, handlePage, setPage }) {

  const totalPages = Math.ceil(totalProducts / page.perPage)
  
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={(e) => {
            page.currentPage > 1 ? handlePage(page.currentPage - 1) : () => { }
          }}
        >
          Previous
        </button>

        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={(e) => {
            page.currentPage < totalPages ? handlePage(page.currentPage + 1) : () => { }
          }}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium"> {((page.currentPage - 1) * page.perPage) + 1}</span> to <span className="font-medium">{totalProducts % page.perPage != 0 && totalProducts < (page.perPage * page.currentPage) ? (page.perPage * (page.currentPage - 1)) + totalProducts % page.perPage : page.currentPage * page.perPage}</span> of{' '}
            <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={(e) => {
                page.currentPage > 1 ? handlePage(page.currentPage - 1) : () => { }
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map((item, index) => {
              return <button
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${index + 1 == page.currentPage ? `bg-indigo-600 text-white` : 'text-black'}  px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              key={index}
                onClick={(e) => {
                  index < totalPages ? handlePage(index + 1) : () => { }
                }}

              >
                {index + 1}
              </button>
            })}


            <button
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={(e) => {
                page.currentPage < totalPages ? handlePage(page.currentPage + 1) : () => { }
              }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
