import { Car, Family } from "../interfaces";

export const sortTheFamilies = (families: Family[]) => {
    // Sort the families array based on whether they have baseVariantImage
    return families.sort((a: Family, b: Family) => {
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
}

export const formatPrice = (price: number | undefined): string => {
    if (price === undefined) {
      return '';
    }
    return '$' + price.toLocaleString('en-Au');
};

export const filterCarsThatHaveNoFamiliesImages = (cars: Car[]) => {
    // Filter out cars that have no families with baseVariantImages
    // Filter out cars that do not have at least one family with an image
    return cars.filter((car: Car) => 
        car.families.some((family: Family) => family.baseVariantImages.length > 0)
    );
}

export const sortCarsByFamilies = (cars: Car[]) => {
    
    // Now, iterate through each sorted car and sort its 'families' array
    const carsWithSortedFamilies = cars.map((car: Car) => {
        const sortedFamilies = sortTheFamilies([...car.families] as Family[]);

        // Return a new car object with the sorted families
        return { ...car, families: sortedFamilies };
    });
  
    return carsWithSortedFamilies;
}