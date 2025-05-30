import { FunctionComponent } from "react";
import { Car, PageData } from "../interfaces";

export const PageTemplate:FunctionComponent<PageTemplateProp> = ({pageInfo, cars}) => {
  // get cars and pageInfo from ssr and also refetch from the client side too as data may change quickly

  return (
    <div>
      <h1>Cars List</h1>
      <div className='page-info'>
        {/* create a component that displays the page info */}
      </div>
      <div className='car-cards-container'>
        {/* create a component that displays list of cars
        Only display cars by make name that has atleast one family image.
        Each make cars families must be ordered by image first priority. 
        If a make's families contains two or more images, the order of which family should go to first is not important.
        */}
      </div>
    </div>
  )

}

type PageTemplateProp = {
  pageInfo?: PageData,
  cars?: Car[]
}