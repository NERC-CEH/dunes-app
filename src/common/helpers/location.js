/** ****************************************************************************
 * Some location transformation logic.
 **************************************************************************** */
import bigu from 'bigu';
import Log from './log';

const helpers = {
  locationToGrid(location) {
    const gridCoords = bigu.latlng_to_grid_coords(
      location.latitude,
      location.longitude
    );

    if (!gridCoords) {
      return null;
    }

    const normAcc = bigu.GridRefParser.get_normalized_precision(
      location.accuracy * 2 // accuracy is radius
    );

    return gridCoords.to_gridref(normAcc);
  },

  parseGrid(gridrefString) {
    let gridRef;
    const parser = bigu.GridRefParser.factory(gridrefString);

    if (parser) {
      // center gridref
      parser.osRef.x += parser.length / 2;
      parser.osRef.y += parser.length / 2;

      gridRef = parser.osRef;
    }

    return gridRef;
  },

  gridrefStringToLatLng(gridrefString) {
    try {
      const parsedRef = bigu.GridRefParser.factory(gridrefString);
      if (parsedRef) {
        return parsedRef.osRef.to_latLng();
      }

      return null;
    } catch (e) {
      Log(e.message);
    }

    return null;
  },

  isValidGridRef(gridrefString) {
    try {
      const parsedRef = bigu.GridRefParser.factory(gridrefString);
      if (parsedRef && bigu.MappingUtils.is_gb_hectad(parsedRef.hectad)) {
        return true;
      }

      return false;
    } catch (e) {
      Log(e.message);
    }

    return false;
  },
};

export default helpers;
