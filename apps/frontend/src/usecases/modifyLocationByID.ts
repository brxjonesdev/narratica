import { Location } from '../entities/Location';

export default async function modifyLocationByID({
  locationID,
  updatedLocation,
}: {
  locationID: string;
  updatedLocation: Location;
}) {
  console.log(`Updating location with ID: ${locationID}`);
  console.log(`New location data: ${updatedLocation}`);
  return updatedLocation;
}
