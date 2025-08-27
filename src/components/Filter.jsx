import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortby") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      navigate(`${pathName}?${searchParams.toString()}`);
    }, 700);
    return () => {
      clearTimeout(handler);
    };
  }, [searchParams, searchTerm, navigate, pathName]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }

    navigate(`${pathName}?${params}`);
    setCategory(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      params.set("sortby", newOrder);
      navigate(`${pathName}?${params}`);
      return newOrder;
    });
  };

  const handleClearFilter = () => {
    navigate({ pathName: window.location.pathname });
  };
  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
      {/* Search Bar */}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline focus:ring-2 focus:ring-[#5f9ddb]"
        />
        <FiSearch className="absolute left-3 text-slate-800 size={20}" />
      </div>
      {/* Category Selction */}
      <div className="flex sm:flex-row flex-col items-center gap-4">
        <FormControl
          variant="outlined"
          size="small"
          className="text-slate-800 border-slate-700"
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            className="min-w-[120px] text-slate-800 border-slate-700"
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Sort Button & Clear Filter */}
        <Tooltip title="Sort">
          <Button
            onClick={toggleSortOrder}
            variant="contained"
            color="primary"
            className="flex items-center gap-2 h-10"
          >
            Sort By
            {sortOrder === "asc" ? (
              <FiArrowUp size={20} />
            ) : (
              <FiArrowDown size={20} />
            )}
          </Button>
        </Tooltip>
        <button
          onClick={handleClearFilter}
          className="flex items-center gap-2 bg-rose-800 text-white px-3 py-2 rounded-md transition duration-300 shadow-md focus:outline-none hover:bg-rose-900"
        >
          <FiRefreshCw size={16} className="font-semibold" />
          <span className="font-semibold">Clear Filters</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
