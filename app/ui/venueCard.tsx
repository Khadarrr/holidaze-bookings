import React from 'react';
import { Venue } from '../lib/types';

interface VenueCardProps {
  venue: Venue;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  return (
    <div className="venue-card">
      <h2>{venue.name}</h2>
      <img src={venue.media[0].url} alt={venue.media[0].alt || ""} />
      {/* Display other venue details like description, price, etc. */}
    </div>
  );
}

export default VenueCard;
