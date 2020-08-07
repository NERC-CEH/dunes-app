import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';
import { IonList, IonLabel } from '@ionic/react';
import { Main, MenuAttrItem } from '@apps';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';

@observer
class Component extends React.Component {
  static propTypes = {
    subSample: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  getList = () => {
    const { match, subSample } = this.props;
    const { indicatorType } = match.params;
    const isDisabled = subSample.isDisabled();

    const matchesIndictorType = occ => occ.metadata[indicatorType];

    const getItem = occ => {
      const { taxon } = occ.attrs;

      const value = occ.attrs[indicatorType]
        ? `${occ.attrs[indicatorType]}%`
        : null;

      const NameLabel = () => (
        <IonLabel position="stacked" mode="ios" slot="start">
          <IonLabel>
            <b>{taxon.common}</b>
          </IonLabel>
          <IonLabel>
            <i style={{ opacity: 0.8 }}>{taxon.taxon}</i>
          </IonLabel>
        </IonLabel>
      );

      return (
        <MenuAttrItem
          key={occ.cid}
          routerLink={`${match.url}/${occ.cid}/${indicatorType}`}
          value={value}
          skipValueTranslation
          CustomLabel={NameLabel}
          disabled={isDisabled}
        />
      );
    };

    const byTaxon = (o1, o2) =>
      o1.attrs.taxon.taxon.localeCompare(o2.attrs.taxon.taxon);

    const list = subSample.occurrences
      .filter(matchesIndictorType)
      .sort(byTaxon)
      .map(getItem);

    if (!list.length) {
      return (
        <InfoBackgroundMessage>
          There are no species available for this habitat.
        </InfoBackgroundMessage>
      );
    }

    return <IonList lines="full">{list}</IonList>;
  };

  render() {
    return <Main>{this.getList()}</Main>;
  }
}

export default Component;
