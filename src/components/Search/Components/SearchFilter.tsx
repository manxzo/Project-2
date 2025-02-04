// @ts-nocheck
import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import useCategories from "@/hooks/FetchCategories";
import { ConfigContext } from "@/config";
import { SearchIcon } from "@/components/icons";

const SearchFilter = ({ handleSearch, loading }) => {
  const [filter, setFilter] = useState({
    what: "",
    where: "",
    category: "",
    results_per_page: 24,
    max_days_old: 0,
    sort_by: "relevance",
    salary_max: 0,
    salary_min: 0,
  });
  const { categories, error } = useCategories();
  const [salaryRange, setSalaryRange] = useState([0, 0]);
  const [maxDaysOld, setMaxDaysOld] = useState(0);
  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      salary_min: salaryRange[0],
      salary_max: salaryRange[1],
      max_days_old: maxDaysOld,
    }));
  }, [salaryRange[0], salaryRange[1], maxDaysOld]);

  const handleInputChange = (event) => {
    setFilter((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(filter);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="what"
        label="Search Keywords"
        value={filter.what}
        onChange={handleInputChange}
      />
      <Select
        aria-label="Category"
        onChange={handleInputChange}
        name="category"
        placeholder="Categories"
      >
        {categories.map((category) => {
          if (category.tag === "unknown") return null;
          return (
            <SelectItem key={category.tag} value={category.tag}>
              {category.label}
            </SelectItem>
          );
        })}
      </Select>
      <div className="flex gap-2 mb-4" style={{ marginBottom: "0px" }}>
        {Object.entries(filter).map(([key, value],index) => {
          if (!value || key === "what" || key === "category") return null;
          if (key === "max_days_old" && value == 0)
            return (
              <Chip key={key} variant="shadow" color={index%2?"secondary":"danger"}>
                All Postings
              </Chip>
            );
          if ((key === "part_time" || key === "full_time") && value === 0)
            return null;
          if ((key === "part_time" || key === "full_time") && value === 1)
            return (
              <Chip key={key} variant="shadow" color={index%2?"secondary":"danger"}>
                {key} included
              </Chip>
            );
          return (
            <Chip key={key} variant="shadow" color={index%2?"secondary":"warning"}>
              {key}: {value.toString()}
            </Chip>
          );
        })}
      </div>
      <div className="flex gap-2 mb-4" style={{ width: "100%" }}>
        <Popover>
          <PopoverTrigger>
            <Button color="primary">Advanced</Button>
          </PopoverTrigger>
          <PopoverContent className="w-[330px] gap-4">
            <Slider
              className="max-w-md"
              value={salaryRange}
              onChange={setSalaryRange}
              formatOptions={{ style: "currency", currency: "SGD" }}
              label="Salary Range"
              maxValue={50000}
              minValue={0}
              step={1000}
            />
            <Slider
              name="max_days_old"
              onChange={setMaxDaysOld}
              minValue={0}
              maxValue={99}
              label={
                maxDaysOld > 0
                  ? `Posted within ${filter.max_days_old} days`
                  : `All Entries`
              }
            />
            <Input
              className="max-w-xs"
              label="Results per Page"
              type="number"
              name="results_per_page"
              value={filter.results_per_page}
              onChange={handleInputChange}
              min={1}
              max={50}
            />
            <Input
              name="where"
              label="Location"
              value={filter.where}
              onChange={handleInputChange}
            />
          </PopoverContent>
        </Popover>
        <Button
          type="button"
          color={filter.sort_by === "date" ? "secondary" : "warning"}
          onPress={() => {
            filter.sort_by === "date"
              ? setFilter((prev) => ({ ...prev, sort_by: "relevance" }))
              : setFilter((prev) => ({ ...prev, sort_by: "date" }));
          }}
        >
          Sort By: {filter.sort_by === "date" ? "Date" : "Relevance"}
        </Button>
        <Button
          color="success"
          style={{ flex: "auto", fontSize:"1.4em" }}
          type="submit"
          isLoading={loading}
        >
          Search<SearchIcon className="w-5 h-5"/>
        </Button>
      </div>
    </Form>
  );
};

export default SearchFilter;
