import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "./ui/button"

const cities = [
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "london",
    label: "London",
  },
  {
    value: "paris",
    label: "Paris",
  }
]

export function CityCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleSelectClick = () => {
    setOpen(!open)
  }

  const filteredCities = cities.filter(city =>
    city.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative">
      <Button
        onClick={handleSelectClick}
        className="w-[140px] flex items-center justify-between bg-transparent text-gray-300 hover:text-white transition-colors duration-200 rounded-full px-4 py-2"
      >
        {value ? cities.find((city) => city.value === value)?.label : "Select city"}
        <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" />
      </Button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-[220px] bg-gray-900 rounded-xl border border-gray-700 shadow-xl backdrop-blur-lg z-50">
          <div className="p-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search city..."
                className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 mb-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={city.value}
                    className={`p-3 cursor-pointer rounded-lg transition-colors duration-200 ${value === city.value
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    onClick={() => {
                      setValue(city.value)
                      setOpen(false)
                      setSearchQuery("")
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {city.label}
                      {value === city.value && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500 text-center">No city found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}