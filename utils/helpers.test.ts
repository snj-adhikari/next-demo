import { formatPrice, sortTheFamilies, sortCarsByFamilies, filterCarsThatHaveNoFamiliesImages } from './helpers';
import { Car, Family } from '../interfaces';

describe('helpers', () => {
  describe('formatPrice', () => {
    it('returns an empty string when price is undefined', () => {
      expect(formatPrice(undefined)).toBe('');
    });

    it('formats the price with a dollar sign and locale formatting', () => {
      const price = 1000;
      // Example expected output: "$1,000"
      // Note: toLocaleString might vary depending on the runtime locale, so we at least check for the dollar sign.
      const formattedPrice = formatPrice(price);
      expect(formattedPrice).toContain('$');
      expect(formattedPrice).toMatch(/\$\d{1,3}(,\d{3})*/);
    });
  });

  describe('sortTheFamilies', () => {
    it('sorts families so that ones with images come before families without images', () => {
      const familyWithImage: Family = { baseVariantImages: ['img1'] } as Family;
      const familyWithoutImage: Family = { baseVariantImages: [] } as Family;

      const unsortedFamilies: Family[] = [familyWithoutImage, familyWithImage];
      const sortedFamilies = sortTheFamilies(unsortedFamilies);

      expect(sortedFamilies[0]).toBe(familyWithImage);
      expect(sortedFamilies[1]).toBe(familyWithoutImage);
    });

    it('keeps order unchanged if both families either have images or do not have images', () => {
      const family1: Family = { baseVariantImages: ['img1'] } as Family;
      const family2: Family = { baseVariantImages: ['img2'] } as Family;
      const unsortedFamilies1: Family[] = [family1, family2];
      expect(sortTheFamilies(unsortedFamilies1)).toEqual(unsortedFamilies1);

      const family3: Family = { baseVariantImages: [] } as Family;
      const family4: Family = { baseVariantImages: [] } as Family;
      const unsortedFamilies2: Family[] = [family3, family4];
      expect(sortTheFamilies(unsortedFamilies2)).toEqual(unsortedFamilies2);
    });
  });

  describe('sortCarsByFamilies', () => {
    it("sorts each car's families using sortTheFamilies", () => {
      const familyWithImage: Family = { baseVariantImages: ['img1'] } as Family;
      const familyWithoutImage: Family = { baseVariantImages: [] } as Family;

      const car1: Car = {
        slug: 'car-1',
        title: 'Car One',
        uuid: 'uuid-1',
        type: 'sedan',
        makeableId: 101,
        families: [familyWithoutImage, familyWithImage],
      } as Car;

      const car2: Car = {
        slug: 'car-2',
        title: 'Car Two',
        uuid: 'uuid-2',
        type: 'suv',
        makeableId: 102,
        families: [familyWithoutImage],
      } as Car;

      const cars: Car[] = [car1, car2];
      const sortedCars = sortCarsByFamilies(cars);

      // For car1, the family with an image should come first
      expect(sortedCars[0].families[0]).toBe(familyWithImage);
      expect(sortedCars[0].families[1]).toBe(familyWithoutImage);

      // For car2, there's only one family
      expect(sortedCars[1].families).toEqual([familyWithoutImage]);
    });
  });

  describe('filterCarsThatHaveNoFamiliesImages', () => {
    it('filters out cars that have no families with images', () => {
      const familyWithImage: Family = { baseVariantImages: ['img1'] } as Family;
      const familyWithoutImage: Family = { baseVariantImages: [] } as Family;
  
      const carWithImage: Car = {
        slug: 'car-1',
        title: 'Car One',
        uuid: 'uuid-1',
        type: 'sedan',
        makeableId: 101,
        families: [familyWithoutImage, familyWithImage],
      } as Car;
  
      const carWithoutImage: Car = {
        slug: 'car-2',
        title: 'Car Two',
        uuid: 'uuid-2',
        type: 'suv',
        makeableId: 102,
        families: [familyWithoutImage],
      } as Car;
  
      const filteredCars = filterCarsThatHaveNoFamiliesImages([carWithImage, carWithoutImage]);
      expect(filteredCars).toEqual([carWithImage]);
    });
  
    it('returns an empty array if no cars have families with images', () => {
      const familyWithoutImage: Family = { baseVariantImages: [] } as Family;
      const car1: Car = {
        slug: 'car-1',
        title: 'Car One',
        uuid: 'uuid-1',
        type: 'sedan',
        makeableId: 101,
        families: [familyWithoutImage],
      } as Car;
  
      const car2: Car = {
        slug: 'car-2',
        title: 'Car Two',
        uuid: 'uuid-2',
        type: 'suv',
        makeableId: 102,
        families: [familyWithoutImage],
      } as Car;
  
      const filteredCars = filterCarsThatHaveNoFamiliesImages([car1, car2]);
      expect(filteredCars).toEqual([]);
    });
  
    it('includes a car if at least one family has an image', () => {
      const familyWithoutImage: Family = { baseVariantImages: [] } as Family;
      const familyWithImage: Family = { baseVariantImages: ['img1'] } as Family;
      
      const car: Car = {
        slug: 'car-3',
        title: 'Car Three',
        uuid: 'uuid-3',
        type: 'coupe',
        makeableId: 103,
        families: [familyWithoutImage, familyWithImage],
      } as Car;
      
      const filteredCars = filterCarsThatHaveNoFamiliesImages([car]);
      expect(filteredCars).toEqual([car]);
    });
  });
});