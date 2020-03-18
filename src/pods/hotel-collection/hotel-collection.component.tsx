import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HotelEntityVm } from './hotel-collection.vm';
import { HotelCard } from './components/hotel-card.component';

const useStyles = makeStyles({
  listLayout: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

interface Props {
  hotelCollection: HotelEntityVm[];
}

export const HotelCollectionComponent: React.FunctionComponent<
  Props
> = props => {
  const { hotelCollection } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.listLayout} data-testid="hcMaindiv">
        {
          hotelCollection && hotelCollection.map(hotel => {
            if(hotel)
              return(<HotelCard key={hotel.id} hotel={hotel} data-testid="hotelCardElement"/>);
          })
        }
    </div>
  );
};
