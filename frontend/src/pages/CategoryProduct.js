import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Hook to get the current URL
  const navigate = useNavigate();
  
  // Extract the category from the URL search parameters
  const urlSearch = new URLSearchParams(location.search);
  const category = urlSearch.get("category");

  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const fetchData = async (selectedCategory) => {
    setLoading(true); // Start loading
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: selectedCategory, // Send the current selected category
      }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
    setLoading(false); // End loading
  };

  // Fetch products whenever the URL (specifically the category) changes
  useEffect(() => {
    if (category) {
      fetchData([category]); // Fetch products for the selected category
    }
  }, [category]); // Effect depends on the 'category' URL parameter

  // Handle sorting products
  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    if (value === 'asc') {
      setData((prev) => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === 'dsc') {
      setData((prev) => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Desktop View */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Filters (left column) */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Sort by
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                onChange={handleOnChangeSortBy}
                value="asc"
              />
              <label>Price - Low to High</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                onChange={handleOnChangeSortBy}
                value="dsc"
              />
              <label>Price - High to Low</label>
            </div>
          </form>

          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Category
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            {productCategory.map((categoryName, index) => (
              <div className="flex items-center gap-3" key={index}>
                <input
                  type="checkbox"
                  name="category"
                  value={categoryName?.value}
                  checked={categoryName?.value === category}
                  readOnly
                />
                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
              </div>
            ))}
          </form>
        </div>

        {/* Products (right column) */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">Search Results: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && <VerticalCard data={data} />}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden px-4">
        {/* Filters on top of products for mobile */}
        <div className="bg-white p-2 mb-4">
          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Sort by
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                onChange={handleOnChangeSortBy}
                value="asc"
              />
              <label>Price - Low to High</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                onChange={handleOnChangeSortBy}
                value="dsc"
              />
              <label>Price - High to Low</label>
            </div>
          </form>

          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Category
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            {productCategory.map((categoryName, index) => (
              <div className="flex items-center gap-3" key={index}>
                <input
                  type="checkbox"
                  name="category"
                  value={categoryName?.value}
                  checked={categoryName?.value === category}
                  readOnly
                />
                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
              </div>
            ))}
          </form>
        </div>

        {/* Products displayed below filters on mobile */}
        <div>
          <p className="font-medium text-slate-800 text-lg my-2">Search Results: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && <VerticalCard data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
