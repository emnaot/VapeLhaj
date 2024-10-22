import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory'; // Assuming this contains the categories
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const Promotion = () => {
  const [data, setData] = useState([]); // State for products data
  const [loading, setLoading] = useState(false); // Loading state
  const [filterCategoryList, setFilterCategoryList] = useState(
    productCategory.map((category) => category.value) // Initialize with all categories selected
  );
  const navigate = useNavigate();

  // Function to fetch promotional products from API
  const fetchProducts = async (selectedCategories = []) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategories.length > 0 ? selectedCategories : [], // Filter by category if selected
        }),
      });

      const dataResponse = await response.json();
      
      if (response.ok) {
        // Filter products to keep only those on promotion
        const promoProducts = dataResponse?.data?.filter(product => product.sellingPrice < product.price) || [];
        setData(promoProducts); // Update data with promotion products
      } else {
        console.error('API Error:', dataResponse.message); // Handle API errors
      }
    } catch (error) {
      console.error('Error fetching products:', error); // Handle errors
    }
    setLoading(false); // End loading
  };

  // Fetch all promotional products on component mount with all categories checked
  useEffect(() => {
    fetchProducts(filterCategoryList); // Load all promotion products for all categories on initial load
  }, []);

  // Handle category selection
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    setFilterCategoryList((prev) => {
      if (checked) {
        return [...prev, value]; // Add the selected category
      } else {
        return prev.filter((category) => category !== value); // Remove the unselected category
      }
    });
  };

  // Fetch data whenever filterCategoryList changes
  useEffect(() => {
    fetchProducts(filterCategoryList); // Fetch products based on selected categories
  }, [filterCategoryList]);

  // Handle product sorting by price
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
        {/* Filters (Left Column) */}
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
                  checked={filterCategoryList.includes(categoryName?.value)} // Handle multiple selections
                  onChange={handleCategoryChange}
                />
                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
              </div>
            ))}
          </form>
        </div>

        {/* Products (Right Column) */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">Search Results: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {loading ? (
              <p>Loading...</p>
            ) : data.length !== 0 ? (
              <VerticalCard data={data} />
            ) : (
              <p>No products in promotion.</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden px-4">
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
                  checked={filterCategoryList.includes(categoryName?.value)}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
              </div>
            ))}
          </form>
        </div>

        <div>
          <p className="font-medium text-slate-800 text-lg my-2">Search Results: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)]">
            {loading ? (
              <p>Loading...</p>
            ) : data.length !== 0 ? (
              <VerticalCard data={data} />
            ) : (
              <p>No products in promotion.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
