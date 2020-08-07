import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';
import { IonList } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { Main, MenuAttrItem, MenuAttrItemFromModel, MenuNote } from '@apps';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  render() {
    const { sample, match } = this.props;
    const isDisabled = sample.isDisabled();

    const transect = (sample.attrs.location || {}).name;

    const getMediaCount = model => {
      let count = model.media.length;
      if (model.samples) {
        model.samples.forEach(m => {
          count += getMediaCount(m);
        });
      }
      if (model.occurrences) {
        model.occurrences.forEach(m => {
          count += getMediaCount(m);
        });
      }

      return count;
    };
    // TODO: remove once the limit is removed
    const showMaxPhotosWarning = getMediaCount(sample) > 20;

    return (
      <Main>
        <IonList lines="full">
          {isDisabled && (
            <MenuNote>
              This record has been uploaded and cannot be updated.
            </MenuNote>
          )}

          {showMaxPhotosWarning && (
            <MenuNote color="danger">
              This record has exceeded the maximum allowed photos limit (20
              photos max). You can save this record for later use but cannot
              upload it to our database right now. We are working to resolve
              this issue.
            </MenuNote>
          )}

          <MenuAttrItemFromModel attr="surveyors" model={sample} />
          <MenuAttrItemFromModel attr="date" model={sample} />
          <MenuAttrItemFromModel attr="comment" model={sample} />

          <MenuAttrItem
            routerLink={`${match.url}/location`}
            value={transect}
            label="Location"
            icon={locationOutline}
            wrapText
            skipValueTranslation
          />
        </IonList>
      </Main>
    );
  }
}

export default Component;
