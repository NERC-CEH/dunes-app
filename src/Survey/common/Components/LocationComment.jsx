import React from 'react';
import PropTypes from 'prop-types';
import { IonItem, IonLabel } from '@ionic/react';
import { InfoButton } from '@apps';

function LocationComment({ location }) {
  const locationComment = location?.comment || '';
  const shortenedComment = locationComment.slice(0, 80);
  const isLongComment = locationComment.length > 80;

  if (!shortenedComment) return null;

  return (
    <IonItem>
      <IonLabel className="ion-text-wrap">
        {shortenedComment}
        {isLongComment && '...'}
        {isLongComment && (
          <InfoButton label="READ MORE">
            <p>{locationComment}</p>
          </InfoButton>
        )}
      </IonLabel>
    </IonItem>
  );
}

LocationComment.propTypes = {
  location: PropTypes.object,
};

export default LocationComment;
