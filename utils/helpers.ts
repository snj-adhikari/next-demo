import { Car, Family } from "../interfaces";

export const sortCarsByFamilies = (cars: Car[]) => {
    
    // Now, iterate through each sorted car and sort its 'families' array
    const carsWithSortedFamilies = cars.map((car: Car) => {
        const sortedFamilies = [...car.families].sort((a: Family, b: Family) => {
            const aFamilyHasImage = a.baseVariantImages.length > 0;
            const bFamilyHasImage = b.baseVariantImages.length > 0;

            if (aFamilyHasImage && !bFamilyHasImage) {
            return -1; // Family A (with image) comes before Family B (without image)
            } else if (!aFamilyHasImage && bFamilyHasImage) {
            return 1; // Family B (with image) comes before Family A (without image)
            } else {
            return 0; // No change in order for families that both have/don't have images
            }
        });

        // Return a new car object with the sorted families
        return { ...car, families: sortedFamilies };
    });
  
    return carsWithSortedFamilies;
}
    