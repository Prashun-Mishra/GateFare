"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export interface FilterState {
    maxPrice: number
    airlines: string[]
    stops: string[]
    sortBy: string
}

interface FlightFiltersProps {
    minPrice: number
    maxPrice: number
    airlines: string[]
    filters: FilterState
    setFilters: (filters: FilterState) => void
    className?: string
}

export function FlightFilters({
    minPrice,
    maxPrice,
    airlines,
    filters,
    setFilters,
    className,
}: FlightFiltersProps) {
    const handleAirlineChange = (airline: string, checked: boolean) => {
        if (checked) {
            setFilters({ ...filters, airlines: [...filters.airlines, airline] })
        } else {
            setFilters({
                ...filters,
                airlines: filters.airlines.filter((a) => a !== airline),
            })
        }
    }

    const handleStopsChange = (stop: string, checked: boolean) => {
        if (checked) {
            setFilters({ ...filters, stops: [...filters.stops, stop] })
        } else {
            setFilters({
                ...filters,
                stops: filters.stops.filter((s) => s !== stop),
            })
        }
    }

    return (
        <div className={`space-y-8 ${className}`}>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 h-auto p-0 hover:bg-transparent hover:text-blue-700"
                    onClick={() =>
                        setFilters({
                            maxPrice: maxPrice,
                            airlines: [],
                            stops: [],
                            sortBy: "price_asc",
                        })
                    }
                >
                    Clear all
                </Button>
            </div>

            {/* Sort By */}
            <div className="space-y-3">
                <Label>Sort By</Label>
                <Select
                    value={filters.sortBy}
                    onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="price_asc">Cheapest First</SelectItem>
                        <SelectItem value="price_desc">Expensive First</SelectItem>
                        <SelectItem value="duration_asc">Shortest Duration</SelectItem>
                        <SelectItem value="departure_asc">Earliest Departure</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Max Price</Label>
                    <span className="text-sm font-medium text-blue-600">
                        ${filters.maxPrice}
                    </span>
                </div>
                <Slider
                    value={[filters.maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    step={10}
                    onValueChange={(value) =>
                        setFilters({ ...filters, maxPrice: value[0] })
                    }
                    className="py-4"
                />
            </div>

            {/* Stops */}
            <div className="space-y-3">
                <Label>Stops</Label>
                <div className="space-y-2">
                    {["Non-stop", "1 Stop", "2+ Stops"].map((stop) => (
                        <div key={stop} className="flex items-center space-x-2">
                            <Checkbox
                                id={`stop-${stop}`}
                                checked={filters.stops.includes(stop)}
                                onCheckedChange={(checked) =>
                                    handleStopsChange(stop, checked as boolean)
                                }
                            />
                            <label
                                htmlFor={`stop-${stop}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {stop}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Airlines */}
            <div className="space-y-3">
                <Label>Airlines</Label>
                <div className="space-y-2">
                    {airlines.map((airline) => (
                        <div key={airline} className="flex items-center space-x-2">
                            <Checkbox
                                id={`airline-${airline}`}
                                checked={filters.airlines.includes(airline)}
                                onCheckedChange={(checked) =>
                                    handleAirlineChange(airline, checked as boolean)
                                }
                            />
                            <label
                                htmlFor={`airline-${airline}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {airline}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
