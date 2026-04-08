

import type { Crop } from "@/types/crop";

const API_URL = import.meta.env.VITE_API_URL;

// getAllCrops
export const getCrops = async (): Promise<Crop[]> => {
    const res = await fetch(`${API_URL}/crops`)

    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    return await res.json();
};