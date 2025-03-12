import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";

const cities = [
  { value: "new-york", label: "New York" },
  { value: "london", label: "London" },
  { value: "paris", label: "Paris" },
];

export function CityCombobox({ onSelect }) {
  // Accept onSelect prop
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelectClick = () => setOpen(!open);

  const filteredCities = cities.filter((city) =>
    city.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <Button
        onClick={handleSelectClick}
        className="w-[120px] flex items-center justify-between bg-transparent text-gray-700 hover:bg-gray-100 rounded-3xl px-3 py-2"
      >
        {value
          ? cities.find((city) => city.value === value)?.label
          : "Select city"}
        <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" />
      </Button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-[200px] bg-slate-100 rounded-2xl p-3 shadow-lg z-50">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search city..."
              className="w-full p-2 border rounded-md mb-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="max-h-[200px] overflow-y-auto">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={city.value}
                    className={`p-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                      value === city.value ? "bg-gray-50" : ""
                    }`}
                    onClick={() => {
                      setValue(city.value);
                      setOpen(false);
                      setSearchQuery("");
                      onSelect(city.label); // Send selected city to parent
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {city.label}
                      {value === city.value && (
                        <Check className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500 text-center">
                  No city found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
